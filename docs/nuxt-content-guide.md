# Nuxt Content 完全ガイド

> Nuxt Contentの機能、できること・できないことの包括的なまとめ

## 目次

1. [概要](#概要)
2. [できること](#できること)
3. [できないこと](#できないこと)
4. [対応ファイル形式](#対応ファイル形式)
5. [クエリAPI](#クエリapi)
6. [MDC（Markdown Components）](#mdcmarkdown-components)
7. [型定義とスキーマ](#型定義とスキーマ)
8. [高度な機能](#高度な機能)
9. [制限事項と回避策](#制限事項と回避策)
10. [実践的なTips](#実践的なtips)
11. [まとめ](#まとめ)

---

## 概要

### Nuxt Contentとは

**Nuxt Content**は、Nuxtプロジェクト用のGitベースのCMS（コンテンツマネジメントシステム）モジュールです。ファイルベースでコンテンツを管理し、MongoDBライクなクエリAPIでデータを取得できます。

### 主要な特徴

- 📁 **ファイルベースCMS** - Markdown, YAML, JSON, CSVをサポート
- 🔍 **クエリビルダー** - MongoDBライクなAPIでコンテンツをクエリ
- 💾 **SQLite駆動** - 高速なデータベース処理
- 🎨 **Markdownで使えるVue** - MDC構文でコンポーネント埋め込み
- 🎯 **型安全** - Zodスキーマで完全な型サポート
- 🌐 **どこでもデプロイ** - Static, Server, Serverless, Edge対応

### 適した用途

✅ **推奨される用途:**
- ドキュメントサイト
- ブログ
- マーケティングサイト
- ポートフォリオ
- 中小規模のコンテンツサイト

❌ **不向きな用途:**
- 大規模なコンテンツ管理（数千〜数万ページ）
- リアルタイムコラボレーションが必要
- 複雑な権限管理が必要
- コンテンツを他システムと頻繁に共有

---

## できること

### ✅ 1. ファイルベースのコンテンツ管理

複数の形式でコンテンツを記述できます：

```markdown
<!-- content/blog/hello.md -->
---
title: Hello World
date: 2025-01-15
tags: [nuxt, content]
---

# Hello World

This is my first post!
```

```yaml
# content/authors/john.yml
name: John Doe
avatar: /avatars/john.jpg
bio: Full-stack developer
```

```json
// content/config/site.json
{
  "name": "My Site",
  "description": "A great site",
  "social": {
    "twitter": "@mysite"
  }
}
```

### ✅ 2. 強力なクエリAPI

MongoDBライクなAPIでコンテンツを検索・取得：

```typescript
// 単一の記事を取得
const post = await queryCollection('blog')
  .path('/blog/hello')
  .first()

// 条件でフィルタリング
const posts = await queryCollection('blog')
  .where('published', '=', true)
  .where('date', '>', '2024-01-01')
  .order('date', 'DESC')
  .limit(10)
  .all()

// 複雑な条件
const featured = await queryCollection('blog')
  .where('published', '=', true)
  .andWhere(q => q
    .where('featured', '=', true)
    .where('views', '>', 1000)
  )
  .all()
```

### ✅ 3. MDC構文（Markdown Components）

MarkdownファイルにVueコンポーネントを埋め込めます：

```markdown
<!-- Inline props -->
::alert{type="warning"}
This is a **warning** alert!
::

<!-- YAML props -->
::card
---
title: Feature Card
icon: IconRocket
---
This is the card content.
::

<!-- Named slots -->
::hero
My Page Title

#description
This is the hero description.
::

<!-- Nested components -->
::tabs
  :::tab{label="Overview"}
  Overview content here
  :::

  :::tab{label="Features"}
  Features content here
  :::
::
```

### ✅ 4. 型安全なスキーマ定義

Zodを使って厳密な型定義が可能：

```typescript
// content.config.ts
import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/**/*.md',
      schema: z.object({
        title: z.string(),
        date: z.date(),
        author: z.string(),
        tags: z.array(z.string()),
        published: z.boolean().default(false)
      })
    })
  }
})
```

これにより、TypeScriptで完全な型補完とエラーチェックが有効になります。

### ✅ 5. コードハイライト

Shikiを使った美しいシンタックスハイライト：

````markdown
```typescript
const greeting: string = 'Hello, World!'
console.log(greeting)
```
````

VS Codeと同じテーマが使えます。

### ✅ 6. ナビゲーション自動生成

ディレクトリ構造から自動的にナビゲーションを生成：

```typescript
const navigation = await queryCollectionNavigation('docs')

// 結果:
// [
//   {
//     title: 'Getting Started',
//     path: '/getting-started',
//     children: [
//       { title: 'Installation', path: '/getting-started/installation' },
//       { title: 'Configuration', path: '/getting-started/configuration' }
//     ]
//   }
// ]
```

### ✅ 7. 全文検索

検索セクションを生成して全文検索を実装：

```typescript
const sections = await queryCollectionSearchSections('docs')

// Nuxt UI Proと組み合わせて検索UIを構築
```

### ✅ 8. カスタムトランスフォーマー

新しいファイル形式のサポートを追加：

```typescript
import { defineTransformer } from '@nuxt/content'

export default defineTransformer({
  name: 'custom-format',
  extensions: ['.custom'],
  parse: (file) => {
    // カスタムパース処理
    return parsedData
  }
})
```

### ✅ 9. rehype/remarkプラグイン

Markdownの処理をカスタマイズ：

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  mdc: {
    remarkPlugins: {
      'remark-math': {
        src: 'remark-math'
      }
    },
    rehypePlugins: {
      'rehype-katex': {
        src: 'rehype-katex'
      }
    }
  }
})
```

### ✅ 10. Nuxt Studio統合

ビジュアルエディタで共同編集が可能：

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  content: {
    studio: true
  }
})
```

---

## できないこと

### ❌ 1. 大規模なコンテンツ管理

**制限:**
- ファイルベースのため、数千〜数万のコンテンツは管理が困難
- ビルド時間が増加
- Git管理が重くなる

**推奨規模:** 数百ページ程度まで

### ❌ 2. リアルタイムコラボレーション

**制限:**
- Nuxt Studio以外では複数人の同時編集が困難
- 変更の競合解決が手動
- Gitベースのワークフローが必要

**代替案:**
- Headless CMS（Contentful, Strapi等）を検討
- Nuxt Studioを使用

### ❌ 3. 完全なCMS UI

**制限:**
- デフォルトでは管理画面なし
- ファイルエディタ/IDEに依存
- 非技術者にはハードルが高い

**代替案:**
- Nuxt Studio（有料）
- 外部CMSとの統合

### ❌ 4. コンテンツの再利用性

**制限:**
- Nuxt Content特有のフォーマット（MDC等）
- 他のシステムで直接利用しにくい
- 標準的なMarkdownから逸脱する場合がある

### ❌ 5. 環境による制約

**制限:**

| 環境 | better-sqlite3 | libsql | native |
|------|----------------|--------|--------|
| Node.js | ✅ | ✅ | ✅ (v22.5.0+) |
| Vercel | ❌ | ✅ | ❌ |
| Cloudflare | ❌ | ✅ | ❌ |
| StackBlitz | ❌ | ✅ | ❌ |

**注意点:**
- SharedArrayBuffer/Atomicsが必要な環境ではCOOP/COEPヘッダーの設定が必要
- 一部のサーバーレス環境では動作しない場合がある

### ❌ 6. 複雑な権限管理

**制限:**
- ユーザーごとの閲覧・編集権限がない
- ロールベースのアクセス制御がない
- コンテンツの承認フローがない

### ❌ 7. メディア管理

**制限:**
- 画像/動画の管理UIがない
- アップロード機能がない
- 画像最適化は別モジュール（Nuxt Image）が必要

---

## 対応ファイル形式

### 1. Markdown (.md)

**用途:** ページコンテンツ、ブログ記事

**特徴:**
- frontmatterでメタデータ定義
- MDC構文でVueコンポーネント埋め込み
- remarkでAST変換され、SQLiteに保存

**例:**
```markdown
---
title: My Page
description: A great page
---

# Hello

This is **markdown** content.

::alert{type="info"}
You can use components!
::
```

**body構造:**
```typescript
{
  type: 'root',
  children: [
    { type: 'element', tag: 'h1', children: [...] },
    { type: 'element', tag: 'p', children: [...] }
  ]
}
```

### 2. YAML (.yml, .yaml)

**用途:** 構造化データ、設定ファイル

**特徴:**
- 読みやすい
- ネストした構造を簡潔に表現
- `body`フィールドにMarkdownを埋め込み可能

**例:**
```yaml
title: My Article
author: John Doe
tags:
  - nuxt
  - content
metadata:
  published: true
  date: 2025-01-15
body: |
  ## Introduction

  This is markdown in YAML!
```

### 3. JSON (.json)

**用途:** データ管理、API風のコンテンツ

**特徴:**
- プログラムで生成しやすい
- 厳密な構造
- AST構造を直接記述可能（高度）

**例:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "skills": ["Vue", "Nuxt", "TypeScript"]
}
```

**AST構造の例:**
```json
{
  "title": "Article",
  "body": {
    "type": "root",
    "children": [
      {
        "type": "element",
        "tag": "h1",
        "properties": {
          "className": ["title"],
          "id": "main-title"
        },
        "children": [
          { "type": "text", "value": "Hello" }
        ]
      }
    ]
  }
}
```

### 4. CSV (.csv)

**用途:** テーブルデータ、リスト

**特徴:**
- 自動的にオブジェクト配列に変換
- スプレッドシートから簡単にインポート

**例:**
```csv
name,email,role
John Doe,john@example.com,Admin
Jane Smith,jane@example.com,Editor
```

**クエリ例:**
```typescript
const users = await queryCollection('users')
  .where('role', '=', 'Admin')
  .all()
```

---

## クエリAPI

### 基本的な使い方

```typescript
// 全て取得
const all = await queryCollection('blog').all()

// 最初の1件
const first = await queryCollection('blog').first()

// 件数カウント
const count = await queryCollection('blog').count()
```

### フィルタリング

```typescript
// 単純なWHERE
const published = await queryCollection('blog')
  .where('published', '=', true)
  .all()

// 複数条件（AND）
const recent = await queryCollection('blog')
  .where('published', '=', true)
  .where('date', '>', '2024-01-01')
  .all()

// グループ化したAND条件
const featured = await queryCollection('blog')
  .where('published', '=', true)
  .andWhere(q => q
    .where('featured', '=', true)
    .where('views', '>', 1000)
  )
  .all()

// OR条件
const filtered = await queryCollection('blog')
  .where('published', '=', true)
  .orWhere(q => q
    .where('featured', '=', true)
    .where('priority', '>', 5)
  )
  .all()

// SQL生成結果:
// SELECT * FROM blog
// WHERE published = true
// OR (featured = true AND priority > 5)
```

**対応する演算子:**
- `=` - 等しい
- `!=` - 等しくない
- `>` - より大きい
- `>=` - 以上
- `<` - より小さい
- `<=` - 以下

### ソート

```typescript
// 降順
const sorted = await queryCollection('blog')
  .order('date', 'DESC')
  .all()

// 昇順
const ascending = await queryCollection('blog')
  .order('title', 'ASC')
  .all()
```

### ページネーション

```typescript
// 10件に制限
const limited = await queryCollection('blog')
  .limit(10)
  .all()

// スキップ（オフセット）
const page2 = await queryCollection('blog')
  .skip(10)
  .limit(10)
  .all()
```

### パス指定

```typescript
const route = useRoute()
const page = await queryCollection('docs')
  .path(route.path)
  .first()
```

### フィールド選択

```typescript
const docs = await queryCollection('docs')
  .select('title', 'path', 'description')
  .all()

// 結果: [{ title: '...', path: '...', description: '...' }]
```

### 前後のコンテンツ取得

```typescript
const [prev, next] = await queryCollectionItemSurroundings(
  'docs',
  '/docs/getting-started',
  {
    before: 1,
    after: 1,
    fields: ['title', 'description']
  }
)
```

### ナビゲーション生成

```typescript
const navigation = await queryCollectionNavigation('docs', ['badge', 'icon'])

// 結果:
// [
//   {
//     title: 'Getting Started',
//     path: '/getting-started',
//     badge: 'New',
//     children: [...]
//   }
// ]
```

### 検索セクション生成

```typescript
const sections = await queryCollectionSearchSections('docs', {
  ignoredTags: ['script', 'style']
})

// 結果:
// [
//   {
//     id: 'section-1',
//     title: 'Introduction',
//     content: 'This is the introduction...',
//     level: 2,
//     titles: ['Getting Started', 'Introduction']
//   }
// ]
```

---

## MDC（Markdown Components）

### 基本構文

```markdown
<!-- ブロックコンポーネント -->
::component-name
Default slot content
::

<!-- インラインprops -->
::alert{type="warning" dismissible}
This is a **warning** alert!
::

<!-- YAMLでprops -->
::card
---
title: Feature Card
icon: IconRocket
color: blue
---
This is the card content with **markdown**.
::
```

### スロット

```markdown
<!-- デフォルトスロット -->
::hero
My Page Title
::

<!-- 名前付きスロット -->
::hero
My Page Title

#description
This is the description slot.

#cta
[Get Started](/docs)
::
```

### ネストされたコンポーネント

```markdown
<!-- 2レベルのネスト -->
::tabs
  :::tab{label="Tab 1"}
  Content for tab 1
  :::

  :::tab{label="Tab 2"}
  Content for tab 2
  :::
::

<!-- 3レベルのネスト -->
::card-group
  :::card
    ::::icon{name="rocket"}
    ::::

    #title
    Fast

    #description
    Blazing fast performance
  :::
::
```

### カスタムコンポーネントの作成

```vue
<!-- components/content/Alert.vue -->
<script setup lang="ts">
defineProps<{
  type?: 'info' | 'warning' | 'error'
  dismissible?: boolean
}>()
</script>

<template>
  <div :class="['alert', `alert-${type}`]">
    <slot />
    <button v-if="dismissible">×</button>
  </div>
</template>

<style scoped>
.alert {
  padding: 1rem;
  border-radius: 0.5rem;
}
.alert-info { background: #e3f2fd; }
.alert-warning { background: #fff3e0; }
.alert-error { background: #ffebee; }
</style>
```

**使い方:**
```markdown
::alert{type="warning" dismissible}
This is a custom alert component!
::
```

### グローバルコンポーネントの登録

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  components: {
    dirs: [
      { path: '~/components/content', global: true }
    ]
  }
})
```

---

## 型定義とスキーマ

### Zodスキーマの定義

```typescript
// content.config.ts
import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    // ページコレクション
    docs: defineCollection({
      type: 'page',
      source: 'docs/**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        icon: z.string().optional(),
        badge: z.object({
          label: z.string(),
          color: z.string()
        }).optional(),
        links: z.array(z.object({
          label: z.string(),
          to: z.string(),
          icon: z.string().optional()
        })).optional()
      })
    }),

    // データコレクション
    authors: defineCollection({
      type: 'data',
      source: 'authors/**/*.yml',
      schema: z.object({
        name: z.string(),
        avatar: z.string().url(),
        bio: z.string(),
        social: z.object({
          twitter: z.string().optional(),
          github: z.string().optional()
        }).optional()
      })
    }),

    // ブログコレクション
    blog: defineCollection({
      type: 'page',
      source: 'blog/**/*.md',
      schema: z.object({
        title: z.string(),
        date: z.date(),
        author: z.string(),
        tags: z.array(z.string()),
        published: z.boolean().default(false),
        featured: z.boolean().default(false),
        image: z.object({
          src: z.string(),
          alt: z.string()
        }).optional()
      })
    })
  }
})
```

### TypeScript型の自動生成

スキーマを定義すると、TypeScriptの型が自動生成されます：

```typescript
// 自動生成される型（.nuxt/content.d.ts）
interface ContentCollections {
  docs: {
    title: string
    description: string
    icon?: string
    badge?: {
      label: string
      color: string
    }
    // ...
  }
  authors: {
    name: string
    avatar: string
    bio: string
    social?: {
      twitter?: string
      github?: string
    }
  }
}

// 使用例（完全な型補完）
const doc = await queryCollection('docs').first()
doc.title // string
doc.badge?.label // string | undefined
```

### コレクション型

#### 1. page型

ページコンテンツ用（1:1でページに対応）

```typescript
defineCollection({
  type: 'page',
  source: 'docs/**/*.md'
})
```

**特徴:**
- `body`フィールドにAST構造
- ContentRendererで表示
- ナビゲーション生成対象

#### 2. data型

構造化データ用（APIのように使用）

```typescript
defineCollection({
  type: 'data',
  source: 'authors/**/*.yml'
})
```

**特徴:**
- `body`フィールドなし
- 純粋なデータとして扱う
- ナビゲーション生成対象外

---

## 高度な機能

### 1. カスタムトランスフォーマー

新しいファイル形式のサポート追加：

```typescript
// server/transformers/toml.ts
import { defineTransformer } from '@nuxt/content'
import TOML from '@iarna/toml'

export default defineTransformer({
  name: 'toml',
  extensions: ['.toml'],
  parse: (file) => {
    const parsed = TOML.parse(file.body)
    return {
      ...parsed,
      _id: file.id,
      _path: file.path
    }
  }
})
```

### 2. remarkプラグイン

Markdown処理のカスタマイズ：

```typescript
// plugins/remark-custom-directive.ts
import { visit } from 'unist-util-visit'

export default function remarkCustomDirective() {
  return (tree) => {
    visit(tree, 'textDirective', (node) => {
      if (node.name === 'emoji') {
        // :emoji[smile] -> 😊
        node.type = 'text'
        node.value = getEmoji(node.children[0]?.value)
      }
    })
  }
}
```

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  mdc: {
    remarkPlugins: {
      'remark-custom-directive': {
        src: './plugins/remark-custom-directive.ts'
      }
    }
  }
})
```

### 3. rehypeプラグイン

HTML AST処理のカスタマイズ：

```typescript
// plugins/rehype-add-classes.ts
import { visit } from 'unist-util-visit'

export default function rehypeAddClasses(options = {}) {
  return (tree) => {
    visit(tree, 'element', (node) => {
      // 全てのh1にクラス追加
      if (node.tagName === 'h1') {
        node.properties.className = ['page-title']
      }

      // 全てのpにクラス追加
      if (node.tagName === 'p') {
        node.properties.className = ['prose-p']
      }
    })
  }
}
```

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  mdc: {
    rehypePlugins: {
      'rehype-add-classes': {
        src: './plugins/rehype-add-classes.ts'
      }
    }
  }
})
```

### 4. 全文検索の実装

```vue
<!-- components/Search.vue -->
<script setup lang="ts">
import Fuse from 'fuse.js'

const { data: navigation } = await useAsyncData('navigation', () =>
  queryCollectionNavigation('docs')
)

const { data: sections } = await useAsyncData('search-sections', () =>
  queryCollectionSearchSections('docs', {
    ignoredTags: ['pre', 'code', 'script']
  })
)

const searchTerm = ref('')

const fuse = computed(() => {
  if (!sections.value) return null
  return new Fuse(sections.value, {
    keys: ['title', 'content', 'titles'],
    threshold: 0.3,
    includeMatches: true
  })
})

const results = computed(() => {
  if (!searchTerm.value || !fuse.value) return []
  return fuse.value.search(searchTerm.value).slice(0, 10)
})
</script>

<template>
  <div>
    <input v-model="searchTerm" placeholder="Search..." />
    <ul>
      <li v-for="result in results" :key="result.item.id">
        <NuxtLink :to="`${result.item.path}#${result.item.id}`">
          {{ result.item.title }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
```

### 5. ナビゲーションのカスタマイズ

```yaml
# content/docs/.navigation.yml
title: Documentation
icon: i-lucide-book
description: Learn how to use our product
```

```typescript
const navigation = await queryCollectionNavigation('docs')
  .where('_draft', '=', false)
  .order('order', 'ASC')
```

### 6. Proseコンポーネント

HTML要素をVueコンポーネントで置き換え：

```vue
<!-- components/content/ProseH1.vue -->
<script setup lang="ts">
defineProps<{
  id?: string
}>()
</script>

<template>
  <h1 :id="id" class="custom-h1">
    <a :href="`#${id}`" class="header-anchor">#</a>
    <slot />
  </h1>
</template>

<style scoped>
.custom-h1 {
  font-size: 3rem;
  font-weight: bold;
  margin: 2rem 0 1rem;
}
.header-anchor {
  opacity: 0;
  transition: opacity 0.2s;
}
.custom-h1:hover .header-anchor {
  opacity: 1;
}
</style>
```

---

## 制限事項と回避策

### 1. 環境別の制約

#### 問題: SQLiteドライバーの互換性

| ドライバー | Node.js | Vercel | Cloudflare | StackBlitz |
|-----------|---------|--------|------------|------------|
| better-sqlite3 | ✅ | ❌ | ❌ | ❌ |
| libsql | ✅ | ✅ | ✅ | ✅ |
| native | ✅ (22.5.0+) | ❌ | ❌ | ❌ |

#### 回避策:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  content: {
    database: {
      type: 'libsql' // 互換性が高い
    }
  }
})
```

### 2. SharedArrayBuffer要件

#### 問題: COOP/COEPヘッダーが必要

一部の環境でSharedArrayBufferが必要な場合、COOP/COEPヘッダーの設定が必要。

#### 回避策:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  nitro: {
    routeRules: {
      '/**': {
        headers: {
          'Cross-Origin-Embedder-Policy': 'require-corp',
          'Cross-Origin-Opener-Policy': 'same-origin'
        }
      }
    }
  }
})
```

### 3. モジュールロード順序

#### 問題: Nuxt SEOとの併用時の制約

Nuxt Content v3では、Nuxt SEOモジュールを先にロードする必要があります。

#### 回避策:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/seo', // 先にロード
    '@nuxt/content' // 後にロード
  ]
})
```

### 4. 大規模コンテンツ管理

#### 問題: ファイル数が増えるとビルドが遅くなる

#### 回避策:

1. **ページネーション実装**
```typescript
const page = Number(route.query.page) || 1
const perPage = 20

const posts = await queryCollection('blog')
  .skip((page - 1) * perPage)
  .limit(perPage)
  .all()
```

2. **静的生成の最適化**
```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  nitro: {
    prerender: {
      crawlLinks: false, // 自動クロール無効化
      routes: ['/'] // 必要なページのみ
    }
  }
})
```

3. **コンテンツの分割**
```
content/
  blog/
    2024/
      01/
      02/
    2025/
      01/
```

### 5. 画像最適化

#### 問題: 画像管理・最適化機能がない

#### 回避策:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/image' // 追加
  ]
})
```

```vue
<template>
  <NuxtImg
    :src="page.image"
    width="800"
    height="400"
    format="webp"
    quality="80"
  />
</template>
```

---

## 実践的なTips

### 1. JSONでの複雑なUI構築

#### AST構造でリッチなコンテンツ

```json
{
  "title": "Product Page",
  "body": {
    "type": "root",
    "children": [
      {
        "type": "element",
        "tag": "div",
        "properties": {
          "className": ["hero-section"],
          "style": "background: linear-gradient(to right, #667eea, #764ba2); padding: 4rem; color: white;"
        },
        "children": [
          {
            "type": "element",
            "tag": "h1",
            "properties": {
              "className": ["hero-title"],
              "style": "font-size: 3rem; font-weight: bold;"
            },
            "children": [
              { "type": "text", "value": "Amazing Product" }
            ]
          },
          {
            "type": "element",
            "tag": "p",
            "properties": {
              "className": ["hero-description"],
              "style": "font-size: 1.25rem; margin-top: 1rem;"
            },
            "children": [
              { "type": "text", "value": "The best product you'll ever use" }
            ]
          }
        ]
      },
      {
        "type": "element",
        "tag": "div",
        "properties": {
          "className": ["feature-grid"],
          "style": "display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; margin-top: 3rem;"
        },
        "children": [
          {
            "type": "element",
            "tag": "article",
            "properties": {
              "className": ["feature-card"],
              "style": "background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);"
            },
            "children": [
              {
                "type": "element",
                "tag": "h3",
                "children": [{ "type": "text", "value": "Fast" }]
              },
              {
                "type": "element",
                "tag": "p",
                "children": [{ "type": "text", "value": "Lightning fast performance" }]
              }
            ]
          }
        ]
      }
    ]
  }
}
```

### 2. ハイブリッドアプローチ（JSON + Markdown）

```json
{
  "title": "Hybrid Content",
  "layout": "custom",
  "hero": {
    "title": "Welcome",
    "background": "/images/hero.jpg"
  },
  "sections": [
    {
      "type": "markdown",
      "file": "sections/intro.md"
    },
    {
      "type": "features",
      "items": [
        { "title": "Feature 1", "icon": "rocket" },
        { "title": "Feature 2", "icon": "star" }
      ]
    }
  ]
}
```

```vue
<!-- pages/hybrid.vue -->
<script setup lang="ts">
const { data: page } = await useAsyncData('hybrid', () =>
  queryCollection('content').path('/hybrid').first()
)

const sectionComponents = {
  markdown: defineAsyncComponent(() => import('~/components/MarkdownSection.vue')),
  features: defineAsyncComponent(() => import('~/components/FeaturesSection.vue'))
}
</script>

<template>
  <div v-if="page">
    <Hero :title="page.hero.title" :background="page.hero.background" />

    <component
      v-for="(section, index) in page.sections"
      :key="index"
      :is="sectionComponents[section.type]"
      v-bind="section"
    />
  </div>
</template>
```

### 3. scriptタグ注入

#### 方法1: frontmatterで定義

```markdown
---
title: Page with Script
scripts:
  - src: https://cdn.example.com/widget.js
    async: true
  - inline: |
      console.log('Page loaded!')
---

# Content
```

```vue
<script setup lang="ts">
const { data: page } = await useAsyncData(...)

if (page.value?.scripts) {
  useHead({
    script: page.value.scripts.map(script =>
      script.src
        ? { src: script.src, async: script.async }
        : { children: script.inline }
    )
  })
}
</script>
```

#### 方法2: rehypeプラグイン

```typescript
// plugins/rehype-inject-script.ts
export default function rehypeInjectScript(options = {}) {
  return (tree) => {
    tree.children.push({
      type: 'element',
      tagName: 'script',
      properties: {
        src: options.src,
        async: true
      },
      children: []
    })
  }
}
```

### 4. デザイン適用（Tailwind）

```json
{
  "body": {
    "type": "root",
    "children": [
      {
        "type": "element",
        "tag": "div",
        "properties": {
          "className": [
            "bg-gradient-to-r",
            "from-purple-500",
            "to-pink-500",
            "text-white",
            "p-8",
            "rounded-lg",
            "shadow-2xl"
          ]
        },
        "children": [
          {
            "type": "element",
            "tag": "h1",
            "properties": {
              "className": ["text-4xl", "font-bold", "mb-4"]
            },
            "children": [
              { "type": "text", "value": "Beautiful Design" }
            ]
          }
        ]
      }
    ]
  }
}
```

### 5. 動的ルーティング

```vue
<!-- pages/[...slug].vue -->
<script setup lang="ts">
const route = useRoute()
const { data: page } = await useAsyncData(route.path, () =>
  queryCollection('content').path(route.path).first()
)

if (!page.value) {
  throw createError({
    statusCode: 404,
    message: 'Page not found'
  })
}

useSeoMeta({
  title: page.value.title,
  description: page.value.description,
  ogImage: page.value.image
})

// 前後のページ取得
const [prev, next] = await queryCollectionItemSurroundings(
  'content',
  route.path
)
</script>

<template>
  <div>
    <ContentRenderer :value="page" />

    <nav class="pagination">
      <NuxtLink v-if="prev" :to="prev.path">← {{ prev.title }}</NuxtLink>
      <NuxtLink v-if="next" :to="next.path">{{ next.title }} →</NuxtLink>
    </nav>
  </div>
</template>
```

### 6. 目次（TOC）生成

```vue
<script setup lang="ts">
const { data: page } = await useAsyncData(...)

const toc = computed(() => {
  if (!page.value?.body?.toc) return []
  return page.value.body.toc.links || []
})
</script>

<template>
  <aside class="toc">
    <h3>On this page</h3>
    <ul>
      <li v-for="link in toc" :key="link.id">
        <a :href="`#${link.id}`" :class="{ 'depth-2': link.depth === 2 }">
          {{ link.text }}
        </a>
        <ul v-if="link.children">
          <li v-for="child in link.children" :key="child.id">
            <a :href="`#${child.id}`">{{ child.text }}</a>
          </li>
        </ul>
      </li>
    </ul>
  </aside>
</template>
```

### 7. ドラフト機能

```markdown
---
title: Draft Post
_draft: true
---

This is a draft post.
```

```typescript
// 公開済みのみ取得
const published = await queryCollection('blog')
  .where('_draft', '=', false)
  .all()

// 開発環境ではドラフトも表示
const posts = await queryCollection('blog')
  .where('_draft', '=', process.dev ? undefined : false)
  .all()
```

### 8. タグフィルタリング

```vue
<script setup lang="ts">
const route = useRoute()
const tag = route.query.tag

const posts = await useAsyncData('filtered-posts', () => {
  let query = queryCollection('blog')
    .where('published', '=', true)
    .order('date', 'DESC')

  if (tag) {
    // タグでフィルタリング（配列内検索）
    query = query.where('tags', 'LIKE', `%${tag}%`)
  }

  return query.all()
})
</script>
```

### 9. 関連記事

```vue
<script setup lang="ts">
const { data: current } = await useAsyncData(...)

const related = await useAsyncData('related', () =>
  queryCollection('blog')
    .where('_path', '!=', current.value._path)
    .where('published', '=', true)
    // 同じタグを持つ記事（簡易版）
    .limit(3)
    .all()
)
</script>
```

### 10. サイトマップ生成

```typescript
// server/routes/sitemap.xml.ts
export default defineEventHandler(async (event) => {
  const pages = await queryCollection(event, 'content')
    .where('_draft', '=', false)
    .select('_path', 'updatedAt')
    .all()

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `
  <url>
    <loc>https://example.com${page._path}</loc>
    <lastmod>${new Date(page.updatedAt).toISOString()}</lastmod>
  </url>
`).join('')}
</urlset>`

  event.node.res.setHeader('Content-Type', 'application/xml')
  return sitemap
})
```

---

## まとめ

### Nuxt Contentが適している場合

✅ **こんなプロジェクトに最適:**

- 📚 **ドキュメントサイト** - 技術文書、API リファレンス
- 📝 **ブログ** - 個人/企業ブログ（中規模まで）
- 🎨 **ポートフォリオ** - 作品紹介サイト
- 🚀 **マーケティングサイト** - ランディングページ
- 📖 **教育コンテンツ** - チュートリアル、学習サイト

**理由:**
- Git管理できる
- Markdownで書きやすい
- 開発者フレンドリー
- デプロイが簡単
- 型安全

### Nuxt Contentが向かない場合

❌ **こんな場合は別の選択肢を:**

- 🏢 **大規模エンタープライズCMS** → Contentful, Strapi
- 👥 **複数チームでの共同編集** → Sanity, DatoCMS
- 🔐 **複雑な権限管理が必要** → Directus, Payload CMS
- 📊 **大量のコンテンツ（数万ページ）** → Headless CMS
- 🎨 **非技術者が主に編集** → WordPress, Webflow

### 代替案との比較

| 機能 | Nuxt Content | Headless CMS | WordPress |
|-----|--------------|--------------|-----------|
| 学習コスト | 低 | 中 | 低 |
| 技術者向け | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ |
| 非技術者向け | ⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| スケーラビリティ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| コスト | 無料 | 有料〜 | 無料〜 |
| デプロイ容易性 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ |
| Git統合 | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐ |
| 型安全 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐ |

### 最終推奨

**Nuxt Contentを使うべき:**
- 開発者が主にコンテンツを管理
- 中小規模のサイト（〜数百ページ）
- Gitワークフローが使える環境
- TypeScriptで型安全に開発したい
- インフラコストを抑えたい

**別の選択肢を検討すべき:**
- 非技術者が頻繁に編集
- 大規模コンテンツ管理
- リアルタイムコラボが必要
- 複雑な権限管理が必要

---

## 参考リンク

- 📖 [公式ドキュメント](https://content.nuxt.com)
- 🐙 [GitHub リポジトリ](https://github.com/nuxt/content)
- 🎨 [Nuxt Studio](https://nuxt.studio)
- 💬 [Discord コミュニティ](https://discord.com/invite/nuxt)
- 📝 [Examples](https://github.com/nuxt/content/tree/main/playground)

---

**最終更新:** 2025-01-18
**対象バージョン:** Nuxt Content v3.x
