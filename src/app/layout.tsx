import type { Metadata, Viewport } from "next"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { Suspense } from "react"
import { ToasterProvider } from "@/components/providers/ToasterProvider"
import { Analytics } from "@/components/analytics/Analytics"

// =============================
// Google フォント設定（Inter）
// Webフォントの最適化とプリロードを設定
// =============================

const inter = Inter({
  subsets: ["latin"], // 使用する文字セットを指定（ラテン文字）
  display: "swap", // FOUT（Flash of Unstyled Text）を防ぐための設定
  preload: true, // ページの読み込み時にフォントを事前ロード
  variable: "--font-inter" // カスタムCSS変数として使用可能に
})

// =============================
// メタデータ（SEO & OGP）
// 検索エンジン最適化（SEO）とSNSでの表示調整
// =============================

export const metadata: Metadata = {
  title: {
    default: "文章分割ツール", // デフォルトのページタイトル
    template: "%s | 文章分割ツール" // 各ページタイトルのテンプレート
  },
  description: "テキストを指定した文字数で分割するツール", // 検索エンジン向けの説明
  keywords: ["テキスト分割", "文章編集", "コンテンツ管理"], // キーワード設定
  authors: [{ name: "Toshiki Sakuta" }], // ページの作成者情報
  openGraph: {
    title: "文章分割ツール", // OGP（SNSシェア時）のタイトル
    description: "テキストを指定した文字数で分割するツール", // OGPの説明文
    type: "website" // OGPのコンテンツタイプ（Webサイト）
  },
  robots: {
    index: true, // 検索エンジンにページを登録させる
    follow: true // リンクをクロールさせる
  }
}

// =============================
// ビューポート設定（レスポンシブ対応）
// デバイスごとに適切なスケールを設定
// =============================

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" }, // ライトモード時のテーマカラー
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" } // ダークモード時のテーマカラー
  ],
  width: "device-width", // ビューポートの幅をデバイスの画面幅に設定
  initialScale: 1 // 初期のズーム倍率を1倍に固定
}

// =============================
// 非同期コンポーネントのラッパー
// Suspense の共通コンポーネントとして利用
// =============================

const AsyncWrapper = ({ children, fallback = null }: { children: React.ReactNode; fallback?: React.ReactNode }) => (
  <Suspense fallback={fallback}>{children}</Suspense>
)

// =============================
// ローディングスピナー
// コンテンツ読み込み時に表示する UI
// =============================

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary" />
  </div>
)

// =============================
// 非同期プロバイダーを一括管理
// ページ全体で必要な非同期コンポーネントをまとめる
// =============================

const AsyncProviders = () => (
  <>
    <AsyncWrapper>
      <Analytics />
    </AsyncWrapper>
    <AsyncWrapper>
      <ToasterProvider />
    </AsyncWrapper>
  </>
)

// =============================
// ルートレイアウト
// アプリケーション全体のレイアウトを定義
// =============================

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`dark ${inter.variable}`}>
      <body className="bg-gray-900 text-gray-100 min-h-screen antialiased" suppressHydrationWarning>
        {/* 必須プロバイダー（非同期処理） */}
        <AsyncProviders />
        
        {/* メインコンテンツ（ローディング中はスピナーを表示） */}
        <AsyncWrapper fallback={<LoadingSpinner />}>{children}</AsyncWrapper>
      </body>
    </html>
  )
}
