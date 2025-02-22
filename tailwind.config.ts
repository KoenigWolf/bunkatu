import type { Config } from 'tailwindcss'

// =============================
// Tailwind CSS の設定ファイル
// =============================
const config: Config = {
  // =============================
  // Tailwind が適用されるファイルのパスを定義
  // =============================
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',      // ページコンポーネント
    './src/components/**/*.{js,ts,jsx,tsx,mdx}', // UI コンポーネント
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'         // アプリケーションのルート
  ],
  theme: {
    // =============================
    // コンテナのデフォルト設定
    // =============================
    container: {
      center: true, // コンテナを中央寄せにする
      padding: {
        DEFAULT: '1rem', // デフォルトのパディング
        sm: '2rem',      // スモールスクリーン用
        lg: '4rem',      // ラージスクリーン用
        xl: '5rem',      // エクストララージスクリーン用
        '2xl': '6rem'    // 2XLスクリーン用
      },
      screens: {
        '2xl': '1400px'  // 2XLサイズの画面幅を1400pxに設定
      }
    },
    extend: {
      // =============================
      // カスタムカラーの追加
      // =============================
      colors: {
        border: 'hsl(var(--border))',         // 境界線の色
        input: 'hsl(var(--input))',           // 入力フィールドの色
        ring: 'hsl(var(--ring))',             // フォーカスリングの色
        background: 'hsl(var(--background))', // 背景色
        foreground: 'hsl(var(--foreground))', // 前景色
        primary: {
          DEFAULT: 'hsl(var(--primary))',     // メインカラー
          foreground: 'hsl(var(--primary-foreground))' // メインカラーの前景色
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',   // サブカラー
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))', // 危険操作の色
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',       // 落ち着いた色
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',      // アクセントカラー
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',     // ポップオーバーの背景色
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',        // カードの背景色
          foreground: 'hsl(var(--card-foreground))'
        },
        chart: {
          '1': 'hsl(var(--chart-1))',         // チャートカラー1
          '2': 'hsl(var(--chart-2))',         // チャートカラー2
          '3': 'hsl(var(--chart-3))',         // チャートカラー3
          '4': 'hsl(var(--chart-4))',         // チャートカラー4
          '5': 'hsl(var(--chart-5))'          // チャートカラー5
        }
      },
      // =============================
      // カスタムのボーダー半径
      // =============================
      borderRadius: {
        lg: 'var(--radius)',           // 大きめのボーダー半径
        md: 'calc(var(--radius) - 2px)', // 中間のボーダー半径
        sm: 'calc(var(--radius) - 4px)'  // 小さめのボーダー半径
      },
      // =============================
      // カスタムのスケール
      // =============================
      scale: {
        '102': '1.02' // わずかに拡大するためのスケール値
      },
      // =============================
      // カスタムのシャドウ
      // =============================
      boxShadow: {
        soft: '0 2px 15px -3px rgba(var(--primary), 0.1)', // 柔らかいシャドウ
        glow: '0 0 20px -5px rgba(var(--accent), 0.2)'     // 光るエフェクト
      },
      // =============================
      // カスタムのアニメーション
      // =============================
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',  // 横方向のグラデーションアニメーション
        'gradient-y': 'gradient-y 15s ease infinite',  // 縦方向のグラデーションアニメーション
        'gradient-xy': 'gradient-xy 15s ease infinite' // 斜め方向のグラデーションアニメーション
      },
      // =============================
      // キーフレームアニメーションの定義
      // =============================
      keyframes: {
        'gradient-y': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'center top'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'center center'
          }
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left top'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right bottom'
          }
        }
      }
    }
  },
  // =============================
  // ダークモードの設定
  // =============================
  darkMode: ['class'], // クラスによるダークモード切り替え
  // =============================
  // プラグインの追加
  // =============================
  plugins: [require('tailwindcss-animate')] // アニメーションプラグインを追加
}

// 設定をエクスポート
export default config
