<script setup lang="ts">
defineProps<{
  title?: string
  icon?: string
  color?: 'blue' | 'purple' | 'green' | 'red'
}>()
</script>

<template>
  <div :class="['card', color ? `card-${color}` : 'card-blue']">
    <div v-if="icon || title" class="card-header">
      <span v-if="icon" class="card-icon">{{ icon }}</span>
      <h3 v-if="title" class="card-title">{{ title }}</h3>
    </div>
    <div class="card-body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.card {
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.card-icon {
  font-size: 2rem;
  line-height: 1;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
}

.card-body {
  color: #4a5568;
  line-height: 1.6;
}

.card-blue {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.card-blue .card-title,
.card-blue .card-body {
  color: white;
}

.card-purple {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
}

.card-purple .card-title,
.card-purple .card-body {
  color: white;
}

.card-green {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  color: white;
}

.card-green .card-title,
.card-green .card-body {
  color: white;
}

.card-red {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
  color: white;
}

.card-red .card-title,
.card-red .card-body {
  color: white;
}
</style>
