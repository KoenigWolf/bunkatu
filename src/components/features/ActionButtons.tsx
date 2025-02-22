"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/Button"

// =============================
// アクションボタンコンポーネント
// テキストの分割とクリアを実行するボタンを提供
// =============================

interface ActionButtonsProps {
  onSplitClick: () => void // 分割ボタンのクリック処理（テキストを指定文字数で分割）
  onClearClick: () => void // クリアボタンのクリック処理（入力フィールドと出力結果をリセット）
}

export function ActionButtons({ onSplitClick, onClearClick }: ActionButtonsProps) {
  return (
    <motion.div 
      className="flex justify-center gap-4"
      variants={{
        hidden: { opacity: 0, y: 20 }, // 非表示時のアニメーション
        show: { opacity: 1, y: 0 } // 表示時のアニメーション
      }}
    >
      {/* 分割ボタン */}
      <Button 
        onClick={onSplitClick}
        size="lg"
        className="min-w-[120px] transition-all duration-200 hover:scale-105"
      >
        分割する
      </Button>

      {/* クリアボタン */}
      <Button 
        variant="secondary" 
        onClick={onClearClick}
        size="lg"
        className="min-w-[120px] transition-all duration-200 hover:scale-105"
      >
        クリア
      </Button>
    </motion.div>
  )
}
