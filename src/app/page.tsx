import dynamic from "next/dynamic"
import { Suspense } from "react"

// =============================
// MainContent の動的インポート
// 遅延ロードによるパフォーマンス最適化
// =============================

const MainContent = dynamic(() => import("@/components/features/MainContent").then((mod) => mod.MainContent), {
  loading: LoadingIndicator, // ローディング中のフォールバック UI
  ssr: true // サーバーサイドレンダリングを有効化
})

// =============================
// メタデータの動的生成
// SEO 最適化とページ情報の管理
// =============================

export const generateMetadata = () => ({
  title: "文章分割ツール",
  description: "効率的なテキスト分割ツール"
})

// =============================
// Home コンポーネント
// `MainContent` を非同期ロードし、ローディング中は `LoadingIndicator` を表示
// =============================

export default function Home() {
  return (
    <Suspense fallback={<LoadingIndicator />}>
      <MainContent />
    </Suspense>
  )
}

// =============================
// ローディングインジケーター
// 視覚的なフィードバックを提供
// =============================

function LoadingIndicator() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary" />
    </div>
  )
}
