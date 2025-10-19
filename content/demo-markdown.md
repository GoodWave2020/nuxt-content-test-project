---
title: Markdownでのコンポーネント呼び出しデモ
description: MDC構文を使ったコンポーネントの実例
---

# Markdownでのコンポーネント呼び出しデモ

このページでは、Markdown（MDC構文）で実際にコンポーネントを呼び出す例を示します。

## 1. Alert コンポーネント

### 情報アラート

::alert{type="info"}
これは情報メッセージです。MDC構文で簡単に呼び出せます。
::

### 警告アラート

::alert{type="warning"}
これは警告メッセージです。注意が必要な内容を表示します。
::

### エラーアラート

::alert{type="error"}
これはエラーメッセージです。エラー情報を目立たせます。
::

### 成功アラート

::alert{type="success"}
これは成功メッセージです。操作が成功したことを伝えます。
::

### 閉じるボタン付き

::alert{type="info" dismissible}
閉じるボタン付きのアラートです。×ボタンをクリックすると消えます。
::

---

## 2. Card コンポーネント

### 基本的なカード

::card{title="カードタイトル" icon="📝"}
これは基本的なカードです。タイトルとアイコンを設定できます。
::

### カラーバリエーション

::card{title="Blueカード" icon="🔵" color="blue"}
青色のグラデーションカードです。
::

::card{title="Purpleカード" icon="🟣" color="purple"}
紫色のグラデーションカードです。
::

::card{title="Greenカード" icon="🟢" color="green"}
緑色のグラデーションカードです。
::

::card{title="Redカード" icon="🔴" color="red"}
赤色のグラデーションカードです。
::

---

## 3. FeatureCard コンポーネント

::feature-card{title="高速パフォーマンス" icon="🚀" color="blue"}
最適化されたアルゴリズムにより、従来比2倍の速度を実現。
大量のデータも瞬時に処理できます。
::

::feature-card{title="美しいデザイン" icon="✨" color="purple"}
直感的で洗練されたUIデザイン。
ユーザーエクスペリエンスを重視した設計です。
::

::feature-card{title="セキュア" icon="🔒" color="green"}
エンタープライズグレードのセキュリティ。
データの安全性を最優先に考えています。
::

---

## 4. Markdownと組み合わせ

通常のMarkdownとコンポーネントを自由に組み合わせられます。

::alert{type="info"}
**重要:** コンポーネントの前後には空行が必要です。
::

### リストとの組み合わせ

機能一覧：

1. 高速処理
2. セキュアな通信
3. 直感的UI

::card{title="詳細情報" icon="ℹ️" color="blue"}
上記の機能について詳しく知りたい場合は、ドキュメントを参照してください。
::

---

## 5. ネストされた構造

コンポーネント内でMarkdown記法が使えます：

::card{title="マークダウンのサポート" icon="📝" color="purple"}
カード内で**太字**や*イタリック*も使えます。

- リスト項目1
- リスト項目2
- リスト項目3

さらに[リンク](https://nuxt.com)も問題なく動作します。
::

---

## まとめ

::feature-card{title="簡単に使える" icon="👍" color="blue"}
MDC構文を使えば、Markdownファイルから簡単にVueコンポーネントを呼び出せます。
::

::alert{type="success"}
✅ これで実際にコンポーネントが動作していることを確認できました！
::
