"use client"

import { Toaster } from "sonner"

// =============================
// トースト通知プロバイダー
// =============================

export function ToasterProvider() {
  return (
    <Toaster 
      position="top-right" // 通知の表示位置
      toastOptions={{
        style: {
          background: "#1f2937", // ダークグレーの背景
          color: "#f3f4f6", // 明るいテキストカラー
          border: "1px solid #374151", // 境界線を追加して視認性向上
        },
      }}
    />
  )
}
