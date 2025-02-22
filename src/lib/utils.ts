import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// =============================
// クラス名の統合ユーティリティ
// =============================

/**
 * Tailwind クラスの競合を解消しつつ統合する関数
 * - `clsx`: クラス名を動的に組み立てる
 * - `twMerge`: Tailwind の競合クラスを最適化
 * @param inputs - クラス名の配列（文字列または条件付きオブジェクト）
 * @returns 最適化されたクラス名の文字列
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

// =============================
// メモリ効率の良い debounce 実装
// =============================

/**
 * 指定された関数の実行を一定時間遅延させる（デバウンス処理）
 * - 短時間に連続で呼び出された場合、最後の呼び出しのみ実行
 * - DOM イベント（入力フィールド、検索ボックス）の負荷軽減に有効
 * @param fn - 遅延実行する関数
 * @param delay - 遅延時間（ミリ秒）
 * @returns デバウンスされた関数
 */
export function debounce<TArgs extends unknown[]>(
  fn: (...args: TArgs) => void,
  delay: number
): (...args: TArgs) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  return (...args: TArgs) => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId) // 既存のタイマーをクリア
    }

    timeoutId = setTimeout(() => {
      fn(...args) // 指定時間後に関数を実行
      timeoutId = null
    }, delay)
  }
}

// =============================
// 高性能なテキストエンコード関数
// =============================

/**
 * 文字列を `ArrayBuffer` に変換（バイナリエンコード）
 * - `TextEncoder` を使用し、UTF-8 形式でエンコード
 * - Web Worker との通信で TransferableObjects を活用可能
 * @param text - エンコードする文字列
 * @returns `ArrayBuffer`（バイナリデータ）
 */
export function encodeText(text: string): ArrayBufferLike {
  return new TextEncoder().encode(text).buffer
}

// =============================
// 高性能な throttle 実装
// =============================

/**
 * 指定された関数の実行頻度を制限する（スロットリング）
 * - 指定時間内に何度も呼び出されても、最初の 1 回のみ実行
 * - スクロール、リサイズイベントの最適化に有効
 * @param fn - 実行する関数
 * @param limit - 実行間隔（ミリ秒）
 * @returns スロットリングされた関数
 */
export function throttle<T extends (...args: unknown[]) => void>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let lastCall = 0

  return (...args: Parameters<T>) => {
    const now = Date.now()
    if (now - lastCall >= limit) {
      fn(...args)
      lastCall = now
    }
  }
}

// =============================
// 安全な JSON パース関数
// =============================

/**
 * JSON 文字列を安全にパースする
 * - パースエラー時には `null` を返す
 * @param jsonString - パースする JSON 文字列
 * @returns パースされたオブジェクト または `null`
 */
export function safeJsonParse<T>(jsonString: string): T | null {
  try {
    return JSON.parse(jsonString) as T
  } catch (error) {
    console.error("JSON Parse Error:", error)
    return null
  }
}

// =============================
// 安全なオブジェクトのディープコピー
// =============================

/**
 * オブジェクトのディープコピーを作成
 * - `structuredClone` を使用し、ネイティブな方法で高速コピー
 * - `structuredClone` 非対応環境では `JSON` ベースのコピーを使用
 * @param obj - コピー対象のオブジェクト
 * @returns コピーされたオブジェクト
 */
export function deepCopy<T>(obj: T): T {
  if (typeof structuredClone === "function") {
    return structuredClone(obj)
  }
  return safeJsonParse<T>(JSON.stringify(obj)) ?? obj
}
