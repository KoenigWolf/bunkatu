import React, { memo, useCallback, useRef, useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FixedSizeList } from "react-window"
import { toast } from "sonner"
import type { OutputProps } from "@/types/text"

// =============================
// 定数定義（パフォーマンス最適化用）
// =============================

// 1アイテムの高さ（ピクセル単位）
const ITEM_HEIGHT = 200

// アイテムの上下の余白
const ITEM_PADDING = 32

// アニメーション遅延の係数（各アイテムに少しずつ遅延を与える）
const ANIMATION_DELAY_FACTOR = 0.05

// コピー成功時の表示時間（ミリ秒）
const COPY_TIMEOUT = 2000

// 事前読み込みするアイテム数（スクロール時のパフォーマンス向上）
const OVERSCAN_COUNT = 3

// =============================
// メモ化されたアイコンコンポーネント
// =============================

// クリップボードアイコン
const ClipboardIcon = memo(({ className = "" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 1 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
))

// コピー完了アイコン（チェックマーク）
const CheckIcon = memo(({ className = "" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
))

// =============================
// メモ化されたアイコンラッパー
// =============================

/**
 * アイコンコンポーネントをラップし、クリック時のエフェクトを付与
 */
const IconWrapper = memo(({ 
  children, 
  onClick, 
  title 
}: { 
  children: React.ReactNode
  onClick?: () => void
  title?: string 
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    className="absolute top-2 right-2 transition-all duration-200 cursor-pointer"
    onClick={onClick}
    title={title}
  >
    {children}
  </motion.div>
))

// =============================
// メモ化されたテキストパーツコンポーネント
// =============================

/**
 * テキストを分割したパートごとの表示
 */
const TextPart = memo(({ index, style, data }: { 
  index: number
  style: React.CSSProperties
  data: { parts: string[], onCopy: (text: string) => Promise<void> }
}) => {
  const [isCopied, setIsCopied] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const timeoutRef = useRef<number | null>(null)

  // =============================
  // コピー処理の最適化
  // =============================

  /**
   * テキストをクリップボードにコピー
   */
  const handleCopy = useCallback(async () => {
    try {
      await data.onCopy(data.parts[index])
      setIsCopied(true)
      toast.success("テキストをコピーしました")

      // 既存のタイマーをクリア
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current)
      }

      // 新しいタイマーを設定
      timeoutRef.current = window.setTimeout(() => {
        setIsCopied(false)
        timeoutRef.current = null
      }, COPY_TIMEOUT)
      
    } catch {
      toast.error("コピーに失敗しました")
    }
  }, [data, index])

  // クリーンアップ処理
  React.useEffect(() => () => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current)
    }
  }, [])

  // メモ化された行数計算（最大10行まで）
  const rows = useMemo(() => 
    Math.min(10, Math.ceil(data.parts[index].length / 50)),
    [data.parts, index]
  )

  return (
    <motion.div
      style={{
        ...style,
        height: `${ITEM_HEIGHT}px`,
        paddingTop: `${ITEM_PADDING / 2}px`,
        paddingBottom: `${ITEM_PADDING / 2}px`,
      }}
      className="relative group px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.3, 
        delay: index * ANIMATION_DELAY_FACTOR 
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div 
        className="absolute -left-12 top-2 text-sm text-muted-foreground"
        animate={{ scale: isHovered ? 1.1 : 1 }}
      >
        {index + 1}
      </motion.div>

      <div className="relative h-full">
        <label 
          htmlFor={`output-part-${index}`} 
          className="text-sm text-muted-foreground"
        >
          パート {index + 1} 
          <span className="text-muted-foreground/70">
            ({data.parts[index].length} 文字)
          </span>
        </label>

        <motion.textarea
          id={`output-part-${index}`}
          readOnly
          value={data.parts[index]}
          className={`w-full h-full p-4 rounded-lg bg-card text-card-foreground 
            focus:ring-2 focus:ring-ring focus:outline-none resize-none
            transition-all duration-200 ${
              isHovered ? "shadow-lg shadow-ring/20" : ""
            }`}
          rows={rows}
          aria-label={`分割テキストパート ${index + 1}`}
        />

        <AnimatePresence>
          {isCopied ? (
            <IconWrapper key="check">
              <CheckIcon className="h-4 w-4 text-success" />
            </IconWrapper>
          ) : (
            <IconWrapper 
              key="clipboard"
              onClick={handleCopy} 
              title="このパートをクリップボードにコピー"
            >
              <ClipboardIcon className="h-4 w-4 text-foreground/70" />
            </IconWrapper>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
})

// =============================
// 出力コンポーネント
// =============================

/**
 * 分割したテキストの出力リスト
 */
const Output = memo(({ parts }: OutputProps) => {
  const listRef = useRef<FixedSizeList>(null)

  // クリップボード処理の最適化
  const handleCopy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      toast.error("コピーに失敗しました")
    }
  }, [])

  if (parts.length === 0) return null

  return (
    <motion.div className="space-y-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <h2 className="text-xl font-semibold text-foreground">分割結果（{parts.length}パート）</h2>
      <FixedSizeList ref={listRef} height={window.innerHeight - 300} width="100%" itemCount={parts.length} itemSize={ITEM_HEIGHT + ITEM_PADDING} itemData={{ parts, onCopy: handleCopy }} overscanCount={OVERSCAN_COUNT}>
        {TextPart}
      </FixedSizeList>
    </motion.div>
  )
})

// クリップボードアイコン
ClipboardIcon.displayName = 'ClipboardIcon'

// コピー完了アイコン（チェックマーク）
CheckIcon.displayName = 'CheckIcon'

// アイコンラッパー
IconWrapper.displayName = 'IconWrapper'

// テキストパーツ
TextPart.displayName = 'TextPart'

// 出力コンポーネント
Output.displayName = 'Output'

export default Output
