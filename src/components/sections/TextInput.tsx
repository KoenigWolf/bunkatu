"use client"

import { memo, type ChangeEvent, useCallback, useState, useMemo } from "react"
import type { TextInputProps } from "@/types/text"

// =============================
// 定数定義
// =============================

const BASE_TEXTAREA_CLASS = `w-full h-40 p-3 rounded-lg bg-card text-card-foreground placeholder-muted-foreground 
  border border-gray-400 dark:border-gray-600
  focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-400 focus:outline-none resize-y transition-colors duration-150`;

const BASE_NUMBER_INPUT_CLASS = `w-full p-2 rounded-lg bg-card text-card-foreground 
  border border-gray-400 dark:border-gray-600
  focus:ring-2 focus:ring-blue-400 dark:focus:ring-purple-400 focus:outline-none transition-colors duration-150`;

const FOCUS_CLASS = "shadow-md shadow-blue-400/30 dark:shadow-purple-400/30 border-blue-500 dark:border-purple-500";

// =============================
// メモ化されたラベルコンポーネント
// =============================

const InputLabel = memo(({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) => (
  <label
    htmlFor={htmlFor}
    className="block text-sm font-medium text-foreground/80 transition-transform hover:scale-[1.01] duration-150"
  >
    {children}
  </label>
))

// =============================
// メモ化されたカウンター表示コンポーネント
// =============================

const CharCounter = memo(({ count, className }: { count: number; className?: string }) => (
  <div 
    className={`${className} opacity-0 transition-all duration-200 animate-fade-in`}
    style={{ animation: 'fadeIn 0.2s ease forwards' }}
  >
    <span className="font-medium text-foreground/70">{count.toLocaleString()}</span>
  </div>
))

// =============================
// テキスト入力コンポーネント
// =============================

const TextInput = memo(({ text, splitSize, onTextChange, onSplitSizeChange }: TextInputProps) => {
  // =============================
  // 状態管理（フォーカス状態）
  // =============================

  const [isFocused, setIsFocused] = useState({ text: false, size: false })
  
  // 文字数カウントをメモ化して不要な再計算を防止
  const textLength = useMemo(() => text.length, [text]);

  // =============================
  // テキスト入力処理
  // =============================

  const handleTextChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      if (newValue !== text) {
        onTextChange(newValue);
      }
    },
    [onTextChange, text]
  )

  // =============================
  // 分割サイズ入力処理
  // =============================

  const handleSplitSizeChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value === "" ? 0 : Number(e.target.value);
      if (newValue !== splitSize) {
        onSplitSizeChange(newValue);
      }
    },
    [onSplitSizeChange, splitSize]
  )

  // =============================
  // フォーカス処理
  // =============================

  const toggleFocus = useCallback((field: "text" | "size", focus: boolean) => {
    setIsFocused(prev => {
      if (prev[field] === focus) return prev;
      return { ...prev, [field]: focus };
    });
  }, []);

  // メモ化されたクラス名
  const textareaClassName = useMemo(() => 
    `${BASE_TEXTAREA_CLASS} ${isFocused.text ? FOCUS_CLASS : ""}`, 
    [isFocused.text]
  );

  const numberInputClassName = useMemo(() => 
    `${BASE_NUMBER_INPUT_CLASS} ${isFocused.size ? FOCUS_CLASS : ""}`,
    [isFocused.size]
  );

  // メモ化されたカウンターコンポーネント
  const TextCounter = useMemo(() => (
    <CharCounter
      count={textLength}
      className="absolute top-0 right-0 px-3 py-1 text-sm text-muted-foreground bg-muted/50 rounded-bl-lg rounded-tr-lg"
    />
  ), [textLength]);

  const SizeCounter = useMemo(() => (
    <CharCounter
      count={splitSize}
      className="absolute top-0 right-0 px-2 py-1 text-sm text-muted-foreground bg-muted/50 rounded-bl-lg rounded-tr-lg"
    />
  ), [splitSize]);

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="space-y-2">
        <InputLabel htmlFor="text-input">テキスト</InputLabel>
        <div className="relative">
          <textarea
            id="text-input"
            value={text}
            onChange={handleTextChange}
            onFocus={() => toggleFocus("text", true)}
            onBlur={() => toggleFocus("text", false)}
            className={textareaClassName}
            placeholder="ここにテキストを入力してください"
            spellCheck={false}
            autoCorrect="off"
            autoCapitalize="off"
            autoComplete="off"
            data-form-type="text"
            data-lpignore="true"
            aria-label="テキスト入力"
          />
          {TextCounter}
        </div>
      </div>

      <div className="space-y-2">
        <InputLabel htmlFor="split-size">分割サイズ（文字）</InputLabel>
        <div className="flex items-center space-x-2">
          <div className="relative flex-1 transition-transform hover:scale-[1.01] duration-150">
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
              className={numberInputClassName}
              autoComplete="off"
              data-form-type="number"
              data-lpignore="true"
              aria-label="分割サイズ"
            />
            {SizeCounter}
          </div>
        </div>
      </div>
    </div>
  )
})

// =============================
// メモ化されたコンポーネントの表示名を設定
// =============================

InputLabel.displayName = "InputLabel"
CharCounter.displayName = "CharCounter"
TextInput.displayName = "TextInput"

export default TextInput
