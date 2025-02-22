// ============================================
// ESLint 設定ファイル (Next.js App Router Best Practices)
// ============================================

import { dirname } from "node:path"; // Node.js の組み込みモジュールは "node:" プレフィックスを付ける
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc"; // ESLint の Flat Config に対応するための互換モジュール

// ============================================
// __filename と __dirname の設定
// ============================================

// import.meta.url から現在のファイルの絶対パスを取得
const __filename = fileURLToPath(import.meta.url);

// dirname() を使用して現在のファイルがあるディレクトリのパスを取得
const __dirname = dirname(__filename);

// ============================================
// FlatCompat インスタンスの作成
// ============================================

// FlatCompat を使用して、レガシーな ESLint 設定を Flat Config に変換
const compat = new FlatCompat({
  baseDirectory: __dirname, // 設定の基準となるディレクトリを指定
});

// ============================================
// ESLint 設定の定義（Next.js App Router 最適化）
// ============================================

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals", // Core Web Vitals に基づく Next.js の推奨設定
    "next/typescript", // TypeScript を使用する Next.js プロジェクト向け
    "plugin:react-hooks/recommended", // React Hooks の適切な使用を強制
    "plugin:@typescript-eslint/recommended", // TypeScript のベストプラクティス
    "plugin:@next/next/recommended" // Next.js の App Router 最適化ルール
  ),
  {
    rules: {
      "@next/next/no-html-link-for-pages": "off", // App Router では不要なルールを無効化
      "react-hooks/exhaustive-deps": "warn", // useEffect の依存関係ミスを警告
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }], // 未使用変数の警告を抑制
      "import/order": ["error", { "groups": ["builtin", "external", "internal"] }], // インポート順を整理
    },
  },
];

// ============================================
// ESLint 設定をエクスポート
// ============================================

export default eslintConfig;
