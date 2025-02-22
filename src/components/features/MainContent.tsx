"use client"

import { motion } from "framer-motion"
import Header from "@/components/sections/Header"
import TextInput from "@/components/sections/TextInput"
import Output from "@/components/sections/Output"
import { useTextSplitter } from "@/hooks/useTextSplitter"
import { ActionButtons } from "./ActionButtons"

// =============================
// アニメーション設定
// =============================

// コンテナ全体のアニメーション（子要素を順番に表示）
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1 // 子要素間の遅延を設定
    }
  }
}

// 各要素のアニメーション（フェードイン + スライドアップ）
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

// =============================
// メインコンテンツコンポーネント
// =============================

export function MainContent() {
  // テキスト分割フックの状態管理
  const { text, splitSize, parts, setText, setSplitSize, splitText, clearAll } = useTextSplitter()

  return (
    <motion.main 
      className="container mx-auto px-4 py-8 max-w-4xl"
      initial="hidden"
      animate="show"
      variants={containerVariants}
    >
      {/* ヘッダー */}
      <SectionWrapper>
        <Header />
      </SectionWrapper>
      
      {/* 入力エリア・アクションボタン・出力エリア */}
      <motion.div className="space-y-8 mt-8" variants={itemVariants}>
        <SectionWrapper>
          <TextInput 
            text={text}
            splitSize={splitSize}
            onTextChange={setText}
            onSplitSizeChange={setSplitSize}
          />
        </SectionWrapper>

        <SectionWrapper>
          <ActionButtons 
            onSplitClick={splitText} 
            onClearClick={clearAll}
          />
        </SectionWrapper>

        <SectionWrapper>
          <Output parts={parts} />
        </SectionWrapper>
      </motion.div>
    </motion.main>
  )
}

// =============================
// セクションラッパー（再利用可能）
// =============================

const SectionWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div 
    variants={itemVariants}
    initial="hidden"
    animate="show"
  >
    {children}
  </motion.div>
)
