// =============================
// Loading コンポーネントの定義
// =============================

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      {/* =============================
          ローディングインジケーターとメッセージを中央に配置
      ============================= */}
      <div className="flex flex-col items-center gap-4">
        {/* =============================
            スピナーアニメーション
        ============================= */}
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary" />

        {/* =============================
            ローディングテキスト（点滅アニメーション付き）
        ============================= */}
        <p className="text-sm text-muted-foreground animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  )
}
