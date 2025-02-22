// =============================
// テキスト分割の設定（TEXT_SPLIT_CONFIG）
// =============================

export const TEXT_SPLIT_CONFIG = {
  DEFAULT_SIZE: 4000,            // 初期設定の分割サイズ（文字数）
  CHUNK_PROCESSING_SIZE: 200000, // チャンクごとの進捗報告単位（処理負荷の最適化）
  DEBOUNCE_DELAY: 300,           // テキスト入力のデバウンス遅延（ミリ秒）
  WORKER_BATCH_SIZE: 50000,      // Web Worker で一括処理するバッチサイズ
} as const;

// =============================
// エラーメッセージ（ERROR_MESSAGES）
// =============================

export const ERROR_MESSAGES = {
  SPLIT_ERROR: "テキスト分割処理でエラーが発生しました", // テキスト分割のエラーハンドリング用メッセージ
} as const;
