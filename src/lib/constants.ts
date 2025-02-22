// =============================
// テキスト分割の設定
// =============================
export const TEXT_SPLIT_CONFIG = {
  DEFAULT_SIZE: 4000,           // デフォルトの分割サイズ（文字数）
  CHUNK_PROCESSING_SIZE: 200000, // チャンク単位での進捗報告の閾値
  DEBOUNCE_DELAY: 300,          // 入力処理のデバウンス遅延時間（ミリ秒）
  WORKER_BATCH_SIZE: 50000,     // Web Worker で処理するバッチサイズ
} as const

// =============================
// エラーメッセージ
// =============================
export const ERROR_MESSAGES = {
  SPLIT_ERROR: "テキスト分割処理でエラーが発生しました", // テキスト分割時のエラーメッセージ
} as const
