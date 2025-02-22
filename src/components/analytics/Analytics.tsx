"use client"

import { useReportWebVitals } from "next/web-vitals"
import { useEffect } from "react"

// =============================
// Web Vitals & ページビュー分析
// =============================

export function Analytics() {
  // =============================
  // Web Vitalsの計測
  // =============================
  useReportWebVitals((metric) => {
    const { name, value, id } = metric

    // Web Vitalsをコンソールに出力（開発用）
    console.info(`[Web Vitals] ${name}:`, { value, id, metric })

    // 本番環境では適切な分析サービスにデータを送信
    if (process.env.NODE_ENV === "production") {
      // Google Analytics などの分析サービスにデータを送信
      // sendToAnalytics({ name, delta: value, id })
    }
  })

  // =============================
  // ページビューの追跡
  // =============================
  useEffect(() => {
    const reportPageView = () => {
      if (process.env.NODE_ENV === "production") {
        // 本番環境でのページビュー送信処理
        // sendPageView()
      }
    }

    reportPageView()
  }, [])

  return null
}
