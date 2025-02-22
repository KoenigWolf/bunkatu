import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// =============================
// クラス名の統合ユーティリティ
// =============================
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// =============================
// メモリ効率の良い debounce 実装
// =============================
export function debounce<F extends (...args: Parameters<F>) => ReturnType<F>>(
  fn: F,
  delay: number
): (...args: Parameters<F>) => void {
  let timeoutId: NodeJS.Timeout | undefined

  return (...args: Parameters<F>) => {
    if (timeoutId) {
      clearTimeout(timeoutId) // 既存のタイマーをクリア
    }

    timeoutId = setTimeout(() => {
      fn(...args) // 指定時間後に関数を実行
      timeoutId = undefined
    }, delay)
  }
}

// =============================
// TransferableObjects を活用したテキストエンコード
// =============================
export function encodeText(text: string): ArrayBufferLike {
  return new TextEncoder().encode(text).buffer
}
