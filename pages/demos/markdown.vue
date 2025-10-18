<script setup lang="ts">
const { data: page } = await useAsyncData('demo-markdown', async () => {
  const result = await queryCollection('content').path('/demo-markdown').first()
  return result || null
})

useSeoMeta({
  title: page.value?.title || 'Markdownデモ',
  description: page.value?.description || 'Markdownでのコンポーネント呼び出しデモ'
})
</script>

<template>
  <div class="container">
    <div class="back-link">
      <NuxtLink to="/demos">← デモ一覧に戻る</NuxtLink>
    </div>

    <ContentRenderer v-if="page" :value="page" class="prose" />
    <div v-else class="error">
      <h1>Page not found</h1>
      <p>demo-markdown.md が見つかりません</p>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
}

.back-link {
  margin-bottom: 2rem;
}

.back-link a {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.back-link a:hover {
  color: #4c51bf;
}

.error {
  text-align: center;
  padding: 4rem 2rem;
  color: #666;
}

.prose {
  line-height: 1.75;
}

.prose :deep(h1) {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #1a202c;
}

.prose :deep(h2) {
  font-size: 2rem;
  font-weight: bold;
  margin-top: 3rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e2e8f0;
  color: #2d3748;
}

.prose :deep(h3) {
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 2rem;
  margin-bottom: 0.75rem;
  color: #4a5568;
}

.prose :deep(p) {
  margin-bottom: 1rem;
  color: #4a5568;
}

.prose :deep(hr) {
  border: 0;
  border-top: 2px solid #e2e8f0;
  margin: 3rem 0;
}

.prose :deep(code) {
  background: #f7fafc;
  padding: 0.2rem 0.4rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  color: #e53e3e;
}

.prose :deep(strong) {
  font-weight: 600;
  color: #2d3748;
}

.prose :deep(ul) {
  list-style: disc;
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}

.prose :deep(ol) {
  list-style: decimal;
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}

.prose :deep(li) {
  margin-bottom: 0.5rem;
  color: #4a5568;
}

.prose :deep(a) {
  color: #667eea;
  text-decoration: underline;
}

.prose :deep(a:hover) {
  color: #4c51bf;
}

@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }

  .prose :deep(h1) {
    font-size: 2rem;
  }

  .prose :deep(h2) {
    font-size: 1.5rem;
  }
}
</style>
