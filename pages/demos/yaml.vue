<script setup lang="ts">
const { data: page } = await useAsyncData('demo-yaml', async () => {
  const result = await queryCollection('content').path('/demo-yaml').first()
  return result || null
})

useSeoMeta({
  title: page.value?.title || 'YAMLデモ',
  description: page.value?.description || 'YAMLでのコンポーネント呼び出しデモ'
})
</script>

<template>
  <div class="container">
    <div class="back-link">
      <NuxtLink to="/demos">← デモ一覧に戻る</NuxtLink>
    </div>

    <div v-if="page">
      <div class="meta-info">
        <h1>{{ page.title }}</h1>
        <div class="meta">
          <span>著者: {{ page.author }}</span>
          <span>公開日: {{ page.publishedAt }}</span>
        </div>
        <div class="tags">
          <span v-for="tag in page.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
      </div>

      <ContentRenderer :value="page" class="prose" />
    </div>
    <div v-else class="error">
      <h1>Page not found</h1>
      <p>demo-yaml.yml が見つかりません</p>
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

.meta-info {
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid #e2e8f0;
}

.meta-info h1 {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #1a202c;
}

.meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  color: #718096;
}

.tags {
  display: flex;
  gap: 0.5rem;
}

.tag {
  background: #e2e8f0;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  color: #4a5568;
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

.prose :deep(ul),
.prose :deep(ol) {
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}

.prose :deep(li) {
  margin-bottom: 0.5rem;
  color: #4a5568;
}

@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }

  .meta {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
