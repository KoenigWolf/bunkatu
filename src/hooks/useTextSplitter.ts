import { useState, useCallback, useMemo } from "react"
import type { 
  TextSplitterState, 
  TextSplitterActions,
  WorkerMessage,
  WorkerData
} from "@/types/text"
import { TEXT_SPLIT_CONFIG, ERROR_MESSAGES } from "@/lib/constants"
import { debounce, encodeText } from "@/lib/utils"

const {
  DEFAULT_SIZE,
  CHUNK_PROCESSING_SIZE,
  DEBOUNCE_DELAY,
  WORKER_BATCH_SIZE
} = TEXT_SPLIT_CONFIG

// =============================
// Web Worker スクリプトの作成
// =============================

const generateWorkerScript = () => `
  function* createTextChunks(text, splitSize, batchSize) {
    if (!splitSize) {
      yield [text];
      return;
    }
    
    for (let i = 0; i < text.length; i += batchSize) {
      const chunk = text.slice(i, i + batchSize);
      const chunkParts = [];
      
      for (let j = 0; j < chunk.length; j += splitSize) {
        chunkParts.push(chunk.slice(j, j + splitSize));
      }
      
      yield chunkParts;
    }
  }

  self.onmessage = function(e) {
    const { text, splitSize } = e.data;
    const textParts = [];
    const chunkGenerator = createTextChunks(text, splitSize, ${WORKER_BATCH_SIZE});
    let processedLength = 0;

    for (const chunk of chunkGenerator) {
      textParts.push(...chunk);
      processedLength += chunk.length * (splitSize || text.length);

      if (processedLength % ${CHUNK_PROCESSING_SIZE} === 0) {
        self.postMessage({ 
          type: 'progress', 
          completed: processedLength, 
          total: text.length 
        });
      }
    }

    self.postMessage({ type: 'complete', parts: textParts });
  }
`;

// =============================
// Web Worker の作成
// =============================

const createTextSplitWorker = (text: string, splitSize: number) => {
  return new Promise<string[]>((resolve, reject) => {
    try {
      const worker = new Worker(
        URL.createObjectURL(new Blob([generateWorkerScript()], { type: "text/javascript" }))
      );

      worker.onmessage = (e: MessageEvent<WorkerMessage>) => {
        if (e.data.type === "complete") {
          resolve(e.data.parts);
          worker.terminate();
        }
      };

      worker.onerror = (error) => {
        console.error("Web Worker Error:", error);
        reject(error);
        worker.terminate();
      };

      const textBuffer = encodeText(text);
      const workerData: WorkerData = { text, splitSize };
      worker.postMessage(workerData, [textBuffer]);
    } catch (error) {
      console.error("Worker Creation Failed:", error);
      reject(error);
    }
  });
};

// =============================
// テキストスプリッターのカスタムフック
// =============================

export function useTextSplitter(): TextSplitterState & TextSplitterActions {
  const [text, setText] = useState<string>("")
  const [splitSize, setSplitSize] = useState<number>(DEFAULT_SIZE)
  const [parts, setParts] = useState<string[]>([])
  const [isProcessing, setIsProcessing] = useState(false)

  // =============================
  // 入力テキストの変更をデバウンス
  // =============================
  const debouncedSetText = useMemo(
    () => debounce<[string]>((text: string) => setText(text), DEBOUNCE_DELAY),
    []
  );

  // =============================
  // テキスト分割処理（Web Worker 使用）
  // =============================

  const splitText = useCallback(async () => {
    if (isProcessing) return;

    try {
      setIsProcessing(true);

      if (!text.trim()) {
        setParts([]);
        return;
      }

      const textParts = await createTextSplitWorker(text, splitSize);
      setParts(textParts);
    } catch (error) {
      console.error(ERROR_MESSAGES.SPLIT_ERROR, error);
      setParts([]);
    } finally {
      setIsProcessing(false);
    }
  }, [text, splitSize, isProcessing]);

  // =============================
  // クリア処理（入力と結果をリセット）
  // =============================

  const clearAll = useCallback(() => {
    setText("");
    setParts([]);
    setIsProcessing(false);
  }, []);

  return {
    text,
    splitSize,
    parts,
    isProcessing,
    setText: debouncedSetText,
    setSplitSize,
    setParts,
    splitText,
    clearAll,
  };
}
