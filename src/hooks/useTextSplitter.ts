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
  CHUNK_PROCESSING_SIZE,
  DEBOUNCE_DELAY,
  WORKER_BATCH_SIZE
} = TEXT_SPLIT_CONFIG

// =============================
// 最適化された Web Worker の作成
// =============================
const createTextSplitWorker = (text: string, splitSize: number) => {
  return new Promise<string[]>((resolve) => {
    const worker = new Worker(
      URL.createObjectURL(
        new Blob(
          [
            `
            // =============================
            // メモリ効率を改善するためのテキスト分割関数
            // =============================
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
              
              // =============================
              // イテレータを使用してメモリ効率を改善
              // =============================
              for (const chunk of chunkGenerator) {
                textParts.push(...chunk);
                processedLength += chunk.length * (splitSize || text.length);
                
                // 進捗状況を報告（一定チャンクごと）
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
            `
          ],
          { type: "text/javascript" }
        )
      )
    )

    worker.onmessage = (e: MessageEvent<WorkerMessage>) => {
      if (e.data.type === 'complete') {
        resolve(e.data.parts)
        worker.terminate()
      }
    }

    // =============================
    // TransferableObjects を使用してメモリ効率を改善
    // =============================
    const textBuffer = encodeText(text)
    const workerData: WorkerData = { text, splitSize }
    worker.postMessage(workerData, [textBuffer])
  })
}

// =============================
// テキストスプリッターフックの最適化
// =============================
export function useTextSplitter(): TextSplitterState & TextSplitterActions {
  const [text, setText] = useState<string>("")
  const [splitSize, setSplitSize] = useState<number>(0)
  const [parts, setParts] = useState<string[]>([])
  const [isProcessing, setIsProcessing] = useState(false)

  // =============================
  // パフォーマンス最適化のためのメモ化
  // =============================
  const debouncedSetText = useMemo(
    () => debounce((value: string) => setText(value), DEBOUNCE_DELAY),
    []
  )

  // =============================
  // 最適化されたテキスト分割処理
  // =============================
  const splitText = useCallback(async () => {
    if (isProcessing) return

    try {
      setIsProcessing(true)

      // 空のテキストの場合は即座に処理終了
      if (text === "") {
        setParts([])
        return
      }

      // Web Worker を使用した非同期テキスト分割処理
      const textParts = await createTextSplitWorker(text, splitSize)
      setParts(textParts)
    } catch (error) {
      console.error(ERROR_MESSAGES.SPLIT_ERROR, error)
      setParts([])
    } finally {
      setIsProcessing(false)
    }
  }, [text, splitSize, isProcessing])

  // =============================
  // メモリクリーンアップを含むクリア処理
  // =============================
  const clearAll = useCallback(() => {
    setText("")
    setParts([])
    setIsProcessing(false)
  }, [])

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
  }
}
