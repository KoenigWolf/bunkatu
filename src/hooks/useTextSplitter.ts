import { useState, useCallback } from "react"
import type { TextSplitterState, TextSplitterActions } from "@/types/text"
import { TEXT_SPLIT_CONFIG, ERROR_MESSAGES } from "@/lib/constants"

// =============================
// テキストスプリッターのカスタムフック
// =============================

export function useTextSplitter(): TextSplitterState & TextSplitterActions {
  const [text, setText] = useState("")
  const [splitSize, setSplitSize] = useState<number>(TEXT_SPLIT_CONFIG.DEFAULT_SIZE)
  const [parts, setParts] = useState<string[]>([])
  const [isProcessing, setIsProcessing] = useState(false)

  // =============================
  // テキスト分割処理
  // =============================

  const splitText = useCallback(() => {
    if (!text.trim() || splitSize <= 0) {
      setParts([])
      return
    }

    try {
      setIsProcessing(true)
      const textParts: string[] = []

      // テキストを指定サイズで分割
      for (let i = 0; i < text.length; i += splitSize) {
        textParts.push(text.slice(i, i + splitSize))
      }

      setParts(textParts)
    } catch (error) {
      console.error(ERROR_MESSAGES.SPLIT_ERROR, error)
      setParts([])
    } finally {
      setIsProcessing(false)
    }
  }, [text, splitSize])

  // =============================
  // テキスト更新処理
  // =============================

  const handleTextChange = useCallback((newText: string) => {
    setText(newText)
    if (newText.trim() && splitSize > 0) {
      setIsProcessing(true)
      setParts([])
      splitText()
    } else {
      setParts([])
    }
  }, [splitSize, splitText])

  // =============================
  // クリア処理
  // =============================

  const clearAll = useCallback(() => {
    setText("")
    setSplitSize(TEXT_SPLIT_CONFIG.DEFAULT_SIZE)
    setParts([])
    setIsProcessing(false)
  }, [])

  return {
    text,
    splitSize,
    parts,
    isProcessing,
    setText: handleTextChange,
    setSplitSize,
    setParts,
    splitText,
    clearAll,
  }
}
