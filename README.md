✂️ BUNKATU

指定した文字数で簡単にテキストを分割できる Web アプリケーション。
パフォーマンス最適化、アクセシビリティ、モダンな UI/UX を重視して開発。

⸻

🎯 プロジェクトの目標
	•	高パフォーマンス：大規模テキストでも瞬時に処理
	•	アクセシビリティ：WCAG 2.1 AA レベル準拠
	•	保守性：クリーンアーキテクチャによる堅牢な設計
	•	開発効率：最新のツールチェーンによる効率的な開発
	•	品質担保：厳格な型チェックとテスト自動化

⸻

🚀 特徴
	•	モダンな UI：Atomic Design に基づく再利用可能なコンポーネント
	•	キーボード操作対応：WAI-ARIA 準拠のアクセシビリティ
	•	モバイルファースト：レスポンシブデザインとタッチ操作最適化

⸻

🛠️ 技術スタック
	•	フレームワーク：Next.js 14 (App Router)
	•	言語：TypeScript 5.0+
	•	スタイリング：Tailwind CSS + Shadcn UI
	•	状態管理：Jotai + SWR
	•	アニメーション：Framer Motion
	•	品質管理：Biome + Vitest

⸻

💻 開発環境のセットアップ

必要要件
	•	Node.js：18.17.0 以上（推奨：20.x）
	•	npm：9.x 以上
	•	メモリ：最低 8GB（推奨：16GB）
	•	OS：macOS 12+, Windows 10+, Ubuntu 20.04+

インストール手順

npm install

# 開発サーバーの起動
npm run dev

# テストの実行
npm run test

# 型チェック
npm run type-check

# リントとフォーマット
npm run lint

推奨開発ツール
	•	VSCode + 推奨拡張機能（.vscode/extensions.json）
	•	React Developer Tools
	•	Chrome DevTools for Performance

⸻

📦 主要機能

✂️ テキストの分割
	•	指定した文字数での自動分割
	•	分割結果のコピー機能
	•	分割プレビュー

🎨 UI/UX
	•	スムーズなアニメーション（Framer Motion）
	•	レスポンシブデザイン
	•	キーボード操作対応

⸻

🏗️ アーキテクチャ

クリーンなコンポーネント設計 と パフォーマンス最適化 を重視。

設計原則
	•	クリーンアーキテクチャ
	•	ドメインロジックを UI から分離
	•	依存関係の方向を内側に向ける
	•	テスト容易性を重視

レンダリング最適化
	•	React.memo による不要な再レンダリングの防止
	•	useMemo と useCallback の戦略的使用
	•	仮想スクロールによる大量データの効率的な表示

⸻

🔒 セキュリティ対策

フロントエンド
	•	XSS 対策：dangerouslySetInnerHTML の使用制限・エスケープ処理の徹底
	•	CSRF 対策：トークンベースの認証
	•	Content Security Policy：スクリプト実行・リソース読み込み制御

データ保護
	•	センシティブデータの暗号化
	•	セッション管理の適切な実装
	•	HTTPS の強制

脆弱性対策
	•	依存パッケージの定期的な更新
	•	セキュリティスキャンの実施
	•	適切なエラーハンドリング

⸻

📚 参考文献
	•	Next.js 公式ドキュメント
	•	TypeScript Handbook
	•	Tailwind CSS 公式ドキュメント
	•	Jotai 公式リファレンス
	•	Framer Motion ガイド
	•	Vitest ドキュメント
	•	Biome 公式リファレンス

⸻

📝 ライセンス

このプロジェクトは MIT License のもとで提供されます。