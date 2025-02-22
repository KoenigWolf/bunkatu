"use client"

import { memo, type ChangeEvent, useCallback, useState } from "react"
import { motion } from "framer-motion"
import type { TextInputProps } from "@/types/text"

// =============================
// メモ化されたラベルコンポーネント
// =============================

const InputLabel = memo(({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) => (
  <motion.label
    htmlFor={htmlFor}
    className="block text-sm font-medium text-foreground/80"
    whileHover={{ scale: 1.01 }} // hover：1.01倍に拡大
  >
    {children}
  </motion.label>
))

// =============================
// メモ化されたカウンター表示コンポーネント
// =============================

const CharCounter = memo(({ count, className }: { count: number; className?: string }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: -10 }} // hidden：透明 & 10px上に移動
    animate={{ opacity: 1, y: 0 }} // visible：表示 & 元の位置
    transition={{ duration: 0.2 }} // duration：0.2秒でフェードイン
  >
    <span className="font-medium text-foreground/70">{count.toLocaleString()}</span>
  </motion.div>
))

// =============================
// テキスト入力コンポーネント
// =============================

const TextInput = memo(({ text, splitSize, onTextChange, onSplitSizeChange }: TextInputProps) => {
  // =============================
  // 状態管理（フォーカス状態）
  // =============================

  const [isFocused, setIsFocused] = useState({ text: false, size: false })

  // =============================
  // テキスト入力処理
  // =============================

  const handleTextChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      onTextChange(e.target.value)
    },
    [onTextChange]
  )

  // =============================
  // 分割サイズ入力処理
  // =============================

  const handleSplitSizeChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onSplitSizeChange(e.target.value === "" ? 0 : Number(e.target.value))
    },
    [onSplitSizeChange]
  )

  // =============================
  // フォーカス処理
  // =============================

  const toggleFocus = useCallback((field: "text" | "size", focus: boolean) => {
    setIsFocused((prev) => ({ ...prev, [field]: focus }))
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <div className="space-y-2">
        <InputLabel htmlFor="text-input">テキスト</InputLabel>
        <div className="relative">
          <textarea
            id="text-input"
            value={text}
            onChange={handleTextChange}
            onFocus={() => toggleFocus("text", true)}
            onBlur={() => toggleFocus("text", false)}
            className={`w-full h-40 p-3 rounded-lg bg-card text-card-foreground placeholder-muted-foreground 
              border border-gray-400 dark:border-gray-600
              focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-400 focus:outline-none resize-y transition-all duration-200 
              ${isFocused.text ? "shadow-md shadow-blue-400/30 dark:shadow-purple-400/30 border-blue-500 dark:border-purple-500" : ""}`}
            placeholder="ここにテキストを入力してください"
            spellCheck={false}
            autoCorrect="off"
            autoCapitalize="off"
            autoComplete="off"
            data-form-type="text"
            data-lpignore="true"
            aria-label="テキスト入力"
          />
          <CharCounter
            count={text.length}
            className="absolute top-0 right-0 px-3 py-1 text-sm text-muted-foreground bg-muted/50 rounded-bl-lg rounded-tr-lg"
          />
        </div>
      </div>

      <div className="space-y-2">
        <InputLabel htmlFor="split-size">分割サイズ（文字）</InputLabel>
        <div className="flex items-center space-x-2">
          <motion.div className="relative flex-1" whileHover={{ scale: 1.01 }}>
            <input
              id="split-size"
              type="number"
              inputMode="numeric"
              pattern="[0-9]*"
              min="1"
              value={splitSize || ""}
              onChange={handleSplitSizeChange}
              onFocus={() => toggleFocus("size", true)}
              onBlur={() => toggleFocus("size", false)}
              className={`w-full p-2 rounded-lg bg-card text-card-foreground 
                border border-gray-400 dark:border-gray-600
                focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-400 focus:outline-none transition-all duration-200 
                ${isFocused.size ? "shadow-md shadow-blue-400/30 dark:shadow-purple-400/30 border-blue-500 dark:border-purple-500" : ""}`}
              autoComplete="off"
              data-form-type="number"
              data-lpignore="true"
              aria-label="分割サイズ"
            />
            <CharCounter
              count={splitSize}
              className="absolute top-0 right-0 px-2 py-1 text-sm text-muted-foreground bg-muted/50 rounded-bl-lg rounded-tr-lg"
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
})

// =============================
// メモ化されたコンポーネントの表示名を設定
// =============================

InputLabel.displayName = "InputLabel"
CharCounter.displayName = "CharCounter"
TextInput.displayName = "TextInput"

export default TextInput
