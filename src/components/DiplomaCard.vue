<template>
  <article :class="$style.card">
    <div :class="$style.content">
      <h3 :class="$style.title">{{ diploma.subject }}</h3>
      <p :class="$style.description">{{ diploma.short_content }}</p>

      <div v-if="studyName" :class="$style.badge">
        {{ studyName }}
      </div>
    </div>

    <router-link
      :to="`/diplomas/${diploma.inn}-${transliterate(diploma.value)}`"
      :class="$style.link"
    >
      Подробнее <ArrowIcon :class="$style.arrow" />
    </router-link>
  </article>
</template>

<script setup lang="ts">
import { transliterate } from '@/utils/transliterate'
import ArrowIcon from '@/assets/icons/arrow-right.svg?component'

defineProps({
  diploma: {
    type: Object,
    required: true
  },
  studyName: {
    type: String,
    default: ''
  }
})
</script>

<style module lang="scss">
.card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
}

.content {
  margin-bottom: 15px;
}

.title {
  font-size: 18px;
  margin: 0 0 10px 0;
  color: #2c3e50;
}

.description {
  font-size: 14px;
  color: #666;
  margin: 0 0 15px 0;
  line-height: 1.5;
}

.badge {
  display: inline-block;
  background-color: #e8f5f1;
  color: #2c7d63;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.link {
  display: inline-flex;
  align-items: center;
  color: #6fd6be;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;

  &:hover {
    color: #4ab59b;
  }
}

.arrow {
  width: 16px;
  height: 16px;
  margin-left: 5px;
  fill: currentColor;
  transition: transform 0.2s;

  .link:hover & {
    transform: translateX(3px);
  }
}

@media (max-width: 576px) {
  .card {
    padding: 15px;
  }

  .title {
    font-size: 16px;
  }
}
</style>
