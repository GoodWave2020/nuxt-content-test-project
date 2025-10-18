<script setup lang="ts">
const { data: article } = await useAsyncData('article', async () => {
  const result = await queryCollection('content').path('/article').first()
  return result || null
})

useSeoMeta({
  title: article.value?.title,
  description: article.value?.description
})
</script>

<template>
  <div v-if="article">
    <h1>{{ article.title }}</h1>
    <p class="meta">
      <span>著者: {{ article.author }}</span> |
      <span>公開日: {{ article.publishedAt }}</span>
    </p>
    <div class="tags">
      <span v-for="tag in article.tags" :key="tag" class="tag">{{ tag }}</span>
    </div>

    <!-- ContentRendererでJSON構造をレンダリング -->
    <ContentRenderer :value="article" />
  </div>
  <div v-else>Article not found</div>
</template>

<style scoped>
.meta {
  color: #666;
  margin: 1rem 0;
}
.tags {
  display: flex;
  gap: 0.5rem;
  margin: 1rem 0;
}
.tag {
  background: #e0e0e0;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
}
</style>
