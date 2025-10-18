# Nuxt Content 要約ガイド

> Nuxt Contentの機能を簡潔にまとめたクイックリファレンス

## 📖 目次

1. [Nuxt Contentとは](#nuxt-contentとは)
2. [主要機能](#主要機能)
3. [できること・できないこと](#できることできないこと)
4. [ファイル形式](#ファイル形式)
5. [クエリAPI](#クエリapi)
6. [MDC構文](#mdc構文)
7. [使い分けガイド](#使い分けガイド)

---

## Nuxt Contentとは

**Gitベースのファイル型CMS**。Markdown、YAML、JSON、CSVでコンテンツを管理し、MongoDBライクなAPIでクエリできます。

### 特徴

- 📁 ファイルベース（Git管理）
- 🔍 強力なクエリAPI
- 💾 SQLite駆動
- 🎨 MarkdownでVueコンポーネント使用可能
- 🎯 型安全（Zodスキーマ）
- 🌐 SSR/SSG/Edge対応

### 適した用途

✅ **推奨:**
- ドキュメントサイト
- ブログ（中小規模）
- マーケティングサイト
- ポートフォリオ

❌ **不向き:**
- 大規模CMS（数千ページ以上）
- リアルタイムコラボレーション
- 複雑な権限管理

---

## 主要機能

### 1. ファイルベースCMS

```markdown
<!-- content/blog/hello.md -->
---
title: Hello World
date: 2025-01-15
---

# Hello World
Content here...
```

### 2. クエリAPI

```typescript
// 記事取得
const posts = await queryCollection('blog')
  .where('published', '=', true)
  .order('date', 'DESC')
  .limit(10)
  .all()
```

### 3. 型安全なスキーマ

```typescript
// content.config.ts
export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/**/*.md',
      schema: z.object({
        title: z.string(),
        date: z.date(),
        tags: z.array(z.string())
      })
    })
  }
})
```

### 4. MDC構文

```markdown
::alert{type="warning"}
これは警告メッセージです！
::

::card{title="機能カード" icon="rocket"}
カードの内容
::
```

---

## できること・できないこと

### ✅ できること

| 機能 | 説明 |
|------|------|
| **複数ファイル形式** | Markdown, YAML, JSON, CSV |
| **クエリAPI** | フィルタリング、ソート、ページネーション |
| **MDC構文** | MarkdownにVueコンポーネント埋め込み |
| **型定義** | Zodスキーマで完全な型安全性 |
| **コードハイライト** | Shiki統合 |
| **ナビゲーション自動生成** | ディレクトリ構造から自動作成 |
| **全文検索** | 検索セクション生成 |
| **カスタマイズ** | rehype/remarkプラグイン |

### ❌ できないこと

| 制限 | 理由・代替案 |
|------|------------|
| **大規模管理** | ファイルベースの限界（数百ページまで推奨） |
| **リアルタイムコラボ** | Gitベース（Studio利用で緩和） |
| **管理UI** | デフォルトなし（Studio利用） |
| **複雑な権限管理** | 非対応（Headless CMS検討） |
| **環境制約** | 一部サーバーレス環境で制限あり |

---

## ファイル形式

### Markdown (.md)

**用途:** 記事、ドキュメント

```markdown
---
title: My Page
description: A great page
---

# Hello

**Markdown** content with ::components::
```

**特徴:**
- 書きやすい
- MDC構文対応
- remarkでAST変換

### YAML (.yml)

**用途:** データ + コンテンツ

```yaml
title: Article
author: John Doe
tags: [nuxt, content]
body: |
  ## Markdown in YAML
  Content here...
```

**特徴:**
- 読みやすい
- Markdownまたは**AST構造**で`body`定義可能

### JSON (.json)

**用途:** プログラム生成、データ管理

```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

**特徴:**
- プログラムで生成容易
- **AST構造でHTML直接定義可能**

### AST構造でHTML定義

**JSON/YAMLでHTMLを完全コントロール:**

#### 例1: 基本的なHTML構造（JSON）

```json
{
  "title": "Custom Page",
  "body": {
    "type": "root",
    "children": [
      {
        "type": "element",
        "tag": "div",
        "properties": {
          "className": ["hero"],
          "style": "background: blue; padding: 2rem;"
        },
        "children": [
          {
            "type": "element",
            "tag": "h1",
            "children": [{ "type": "text", "value": "Title" }]
          }
        ]
      }
    ]
  }
}
```

#### 例2: リッチなコンポーネント構造（YAML）

```yaml
title: Feature Page
description: Features built with AST
body:
  type: root
  children:
    # ヒーローセクション
    - type: element
      tag: section
      properties:
        className:
          - hero-section
        style: "background: linear-gradient(to right, #667eea, #764ba2); color: white; padding: 4rem; border-radius: 12px;"
      children:
        - type: element
          tag: h1
          properties:
            className:
              - hero-title
            style: "font-size: 3rem; margin-bottom: 1rem;"
          children:
            - type: text
              value: "Welcome to Our Platform"
        - type: element
          tag: p
          properties:
            className:
              - hero-subtitle
            style: "font-size: 1.5rem;"
          children:
            - type: text
              value: "Built entirely with YAML AST structure"

    # 特徴カードグリッド
    - type: element
      tag: div
      properties:
        className:
          - feature-grid
        style: "display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; margin-top: 3rem;"
      children:
        # カード1
        - type: element
          tag: article
          properties:
            className:
              - feature-card
            style: "background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"
          children:
            - type: element
              tag: div
              properties:
                className:
                  - card-icon
                style: "font-size: 3rem; margin-bottom: 1rem;"
              children:
                - type: text
                  value: "🚀"
            - type: element
              tag: h3
              properties:
                style: "color: #667eea; margin-bottom: 0.5rem;"
              children:
                - type: text
                  value: "Fast Performance"
            - type: element
              tag: p
              properties:
                style: "color: #666;"
              children:
                - type: text
                  value: "Optimized for speed and efficiency"

        # カード2
        - type: element
          tag: article
          properties:
            className:
              - feature-card
            style: "background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"
          children:
            - type: element
              tag: div
              properties:
                style: "font-size: 3rem; margin-bottom: 1rem;"
              children:
                - type: text
                  value: "✨"
            - type: element
              tag: h3
              properties:
                style: "color: #764ba2; margin-bottom: 0.5rem;"
              children:
                - type: text
                  value: "Beautiful Design"
            - type: element
              tag: p
              properties:
                style: "color: #666;"
              children:
                - type: text
                  value: "Stunning UI that users love"

        # カード3
        - type: element
          tag: article
          properties:
            className:
              - feature-card
            style: "background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"
          children:
            - type: element
              tag: div
              properties:
                style: "font-size: 3rem; margin-bottom: 1rem;"
              children:
                - type: text
                  value: "🔒"
            - type: element
              tag: h3
              properties:
                style: "color: #10b981; margin-bottom: 0.5rem;"
              children:
                - type: text
                  value: "Secure"
            - type: element
              tag: p
              properties:
                style: "color: #666;"
              children:
                - type: text
                  value: "Enterprise-grade security"
```

#### 例3: インタラクティブ要素（JSON）

```json
{
  "title": "Interactive Page",
  "body": {
    "type": "root",
    "children": [
      {
        "type": "element",
        "tag": "div",
        "properties": {
          "className": ["cta-section"]
        },
        "children": [
          {
            "type": "element",
            "tag": "h2",
            "children": [{ "type": "text", "value": "Get Started Today" }]
          },
          {
            "type": "element",
            "tag": "div",
            "properties": {
              "className": ["button-group"],
              "style": "display: flex; gap: 1rem; margin-top: 2rem;"
            },
            "children": [
              {
                "type": "element",
                "tag": "a",
                "properties": {
                  "href": "/signup",
                  "className": ["btn", "btn-primary"],
                  "style": "background: #667eea; color: white; padding: 1rem 2rem; border-radius: 6px; text-decoration: none;"
                },
                "children": [{ "type": "text", "value": "Sign Up Free" }]
              },
              {
                "type": "element",
                "tag": "a",
                "properties": {
                  "href": "/demo",
                  "className": ["btn", "btn-secondary"],
                  "style": "border: 2px solid #667eea; color: #667eea; padding: 1rem 2rem; border-radius: 6px; text-decoration: none;"
                },
                "children": [{ "type": "text", "value": "Watch Demo" }]
              }
            ]
          }
        ]
      }
    ]
  }
}
```

#### AST構造の要点

**基本ノード:**
- `type: 'root'` - ルートノード
- `type: 'element'` - HTML要素
- `type: 'text'` - テキスト

**プロパティ:**
- `tag` - HTMLタグ名（`div`, `h1`, `p`など）
- `properties` - HTML属性
  - `className` - クラス名（配列）
  - `style` - インラインスタイル（文字列）
  - `id`, `href`, `src`など - 通常の属性
- `children` - 子ノード（配列）

**使い分け:**
- 人が書く → **Markdown**
- データ + コンテンツ → **YAML + Markdown**
- プログラム生成 → **JSON/YAML + AST**
- 複雑なUI → **YAML + AST**（YAMLの方が見やすい）

---

## クエリAPI

### 基本

```typescript
// 全取得
const all = await queryCollection('blog').all()

// 1件取得
const first = await queryCollection('blog').first()

// 件数
const count = await queryCollection('blog').count()
```

### フィルタリング

```typescript
// WHERE条件
const posts = await queryCollection('blog')
  .where('published', '=', true)
  .where('date', '>', '2024-01-01')
  .all()

// AND/OR条件
const featured = await queryCollection('blog')
  .where('published', '=', true)
  .andWhere(q => q
    .where('featured', '=', true)
    .where('views', '>', 1000)
  )
  .all()
```

### ソート・ページネーション

```typescript
const posts = await queryCollection('blog')
  .order('date', 'DESC')
  .skip(10)
  .limit(10)
  .all()
```

### ナビゲーション

```typescript
const nav = await queryCollectionNavigation('docs')

// 結果:
// [
//   { title: 'Getting Started', path: '/getting-started', children: [...] }
// ]
```

### 前後コンテンツ

```typescript
const [prev, next] = await queryCollectionItemSurroundings('docs', '/current-page')
```

---

## MDC構文

### 基本構文

```markdown
<!-- ブロックコンポーネント -->
::component-name
Content
::

<!-- Props（インライン） -->
::alert{type="warning" dismissible}
Warning message
::

<!-- Props（YAML） -->
::card
---
title: Card Title
icon: rocket
---
Card content
::
```

### スロット

```markdown
<!-- 名前付きスロット -->
::hero
Main title

#description
This is the description

#cta
[Get Started](/docs)
::
```

### ネスト

```markdown
::tabs
  :::tab{label="Tab 1"}
  Content 1
  :::

  :::tab{label="Tab 2"}
  Content 2
  :::
::
```

### カスタムコンポーネント

```vue
<!-- components/content/Alert.vue -->
<script setup lang="ts">
defineProps<{
  type?: 'info' | 'warning' | 'error'
}>()
</script>

<template>
  <div :class="['alert', `alert-${type}`]">
    <slot />
  </div>
</template>
```

**使用:**
```markdown
::alert{type="warning"}
This is a warning!
::
```

---

## 使い分けガイド

### プロジェクト規模

| 規模 | 推奨 | 理由 |
|------|------|------|
| 小規模（〜100ページ） | ✅ Nuxt Content | シンプル、Git管理 |
| 中規模（100〜500ページ） | ✅ Nuxt Content | 管理可能 |
| 大規模（500ページ以上） | ⚠️ 要検討 | Headless CMSも検討 |

### チーム構成

| チーム | 推奨 | 理由 |
|--------|------|------|
| 開発者のみ | ✅ Nuxt Content | ファイル編集で十分 |
| 開発者 + 編集者 | ✅ Nuxt Content + Studio | 役割分担可能 |
| 非技術者中心 | ❌ Headless CMS | UI重視 |

### コンテンツタイプ

| タイプ | 推奨形式 |
|--------|---------|
| ブログ記事 | Markdown |
| ドキュメント | Markdown + MDC |
| 製品データ | YAML/JSON |
| 設定ファイル | YAML |
| APIレスポンス風 | JSON |
| プログラム生成 | JSON/YAML + AST |

---

## クイックスタート

### 1. インストール

```bash
npx nuxi@latest module add content
```

### 2. 設定

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxt/content']
})
```

### 3. コンテンツ作成

```markdown
<!-- content/index.md -->
---
title: Home
---

# Welcome
```

### 4. クエリ

```vue
<script setup lang="ts">
const { data } = await useAsyncData(() =>
  queryCollection('content').path('/').first()
)
</script>

<template>
  <ContentRenderer :value="data" />
</template>
```

---

## まとめ

### Nuxt Contentを選ぶべき理由

✅ Git管理したい
✅ 開発者が主に管理
✅ 中小規模プロジェクト
✅ TypeScript型安全性
✅ インフラコスト削減

### 別の選択肢を検討すべき理由

❌ 大規模コンテンツ（数千ページ）
❌ 非技術者が頻繁に編集
❌ 複雑な権限管理が必要
❌ リアルタイムコラボが必要

---

## 参考リンク

- 📖 [公式ドキュメント](https://content.nuxt.com)
- 🐙 [GitHub](https://github.com/nuxt/content)
- 🎨 [Nuxt Studio](https://nuxt.studio)
- 📝 [詳細ガイド](./nuxt-content-guide.md)

---

**最終更新:** 2025-01-18
**対象バージョン:** Nuxt Content v3.x
