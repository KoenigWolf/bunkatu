// =============================
// テキスト分割の基本状態
// =============================
export interface TextSplitBase {
  text: string      // 入力テキスト
  splitSize: number // 分割サイズ
}

// =============================
// テキスト分割の結果
// =============================
export interface TextSplitResult {
  parts: string[]      // 分割されたテキストの配列
  isProcessing: boolean // 分割処理の進行状況
}

// =============================
// テキストスプリッターの状態管理
// =============================
export interface TextSplitterState extends TextSplitBase, TextSplitResult {}

// =============================
// テキストスプリッターのアクション
// =============================
export interface TextSplitterActions {
  setText: (text: string) => void           // テキストを設定
  setSplitSize: (size: number) => void      // 分割サイズを設定
  setParts: (parts: string[]) => void       // 分割後のテキストを設定
  splitText: () => void                     // テキスト分割を実行
  clearAll: () => void                      // 全データをクリア
}

// =============================
// TextInput コンポーネントの Props
// =============================
export interface TextInputProps extends TextSplitBase {
  onTextChange: (text: string) => void       // テキスト変更時のコールバック
  onSplitSizeChange: (size: number) => void  // 分割サイズ変更時のコールバック
}

// =============================
// Output コンポーネントの Props
// =============================
export interface OutputProps {
  parts: string[] // 分割されたテキストのリスト
}
