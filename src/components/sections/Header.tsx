"use client"

import { motion } from "framer-motion"
import { useId } from "react"

// =============================
// アニメーション設定
// =============================

// HIDDEN：初期状態（透明 & 50px下に移動）
// VISIBLE：表示状態（透明度1 & 元の位置）
const letterAnimation = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 }
}

// タイトルテキスト（アニメーション対象の文字列）
const TITLE = "BUNKATU"

export default function Header() {
  // =============================
  // SSR & CSR で一貫した ID を生成
  // =============================
  const idPrefix = useId()

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }} // 初期状態（20px上に移動・透明）
      animate={{ opacity: 1, y: 0 }} // 表示アニメーション（元の位置に移動）
      transition={{ duration: 0.5 }} // 0.5秒でフェードイン
      className="text-center mb-12"
    >
      {/* =============================
          タイトル部分（BUNKATU のアニメーション）
      ============================= */}
      <motion.div
        className="mb-4"
        whileHover={{ scale: 1.05 }} // ホバー時に1.05倍に拡大
        transition={{ type: "spring", stiffness: 300 }} // スプリングアニメーション
      >
        <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
          {TITLE.split("").map((letter, index) => (
            <motion.span
              key={`${idPrefix}-${letter}-${index}`} // useId() を利用して一貫した ID を付与
              variants={letterAnimation}
              initial="hidden" // HIDDEN：初期状態（透明 & 50px下に移動）
              animate="visible" // VISIBLE：表示アニメーション
              transition={{
                duration: 0.5, // 0.5秒でアニメーション
                delay: index * 0.1, // 文字ごとに0.1秒ずつ遅延
                type: "spring", // SPRING：スプリングアニメーション
                damping: 12, // DAMPING：振動を抑える値
                stiffness: 200 // STIFFNESS：バネの強さ
              }}
              className="inline-block"
            >
              {letter}
            </motion.span>
          ))}
        </h1>
      </motion.div>

      {/* =============================
          説明テキスト部分（ツールの説明）
      ============================= */}
      <motion.p
        className="text-lg md:text-xl text-gray-300 relative"
        initial={{ opacity: 0 }} // 初期状態（透明）
        animate={{ opacity: 1 }} // 表示アニメーション（不透明度1）
        transition={{ delay: 0.8 }} // 0.8秒後にフェードイン
      >
        テキストを指定文字数で分割するツール
        <motion.span
          className="absolute -z-10 inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 blur-xl"
          initial={{ scale: 0 }} // SCALE：初期状態（0倍のサイズ）
          animate={{ scale: 1 }} // SCALE：アニメーションで拡大
          transition={{ delay: 1, duration: 0.5 }} // 1秒後に0.5秒で拡大
        />
      </motion.p>
    </motion.header>
  )
}
