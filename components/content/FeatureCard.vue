<script setup lang="ts">
defineProps<{
  title: string
  icon: string
  color?: 'blue' | 'purple' | 'green'
}>()
</script>

<template>
  <div :class="['feature-card', `color-${color || 'blue'}`]">
    <div class="icon">{{ icon }}</div>
    <h3 class="title">{{ title }}</h3>
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.feature-card {
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
  text-align: center;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.content {
  color: #4a5568;
  line-height: 1.6;
}

.color-blue {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.color-blue .title,
.color-blue .content {
  color: white;
}

.color-purple {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
}

.color-purple .title,
.color-purple .content {
  color: white;
}

.color-green {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  color: white;
}

.color-green .title,
.color-green .content {
  color: white;
}
</style>
