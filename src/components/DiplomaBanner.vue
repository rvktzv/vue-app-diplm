<template>
  <div :class="[$style.banner, { [$style.mobile]: isMobile }]">
    <div :class="$style.imageWrapper">
      <img
        src="@/assets/images/generate-banner.jpg"
        alt="Сгенерировать диплом"
        loading="lazy"
        :class="$style.image"
      >
    </div>

    <div :class="$style.textContent">
      <h3 :class="$style.title">Нужен уникальный диплом?</h3>
      <p :class="$style.subtitle">Сгенерируйте идеальную работу за 5 минут</p>

      <button :class="$style.button" @click="openModal">
        Перейти к генерации
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useModal } from '@/composables/useModal'

const { openModal } = useModal()
defineProps({
  isMobile: {
    type: Boolean,
    default: false
  }
})
</script>

<style module lang="scss">
.banner {
  background-color: #f8f9fa;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;

  &.mobile {
    width: 100%;
  }

  &:not(.mobile) {
    width: 28%;
    min-width: 280px;
  }
}

.imageWrapper {
  position: relative;
  padding-top: 56.25%; // 16:9 aspect ratio
  overflow: hidden;
}

.image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.textContent {
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.title {
  font-size: 18px;
  margin: 0 0 10px 0;
  color: #2c3e50;
}

.subtitle {
  font-size: 14px;
  color: #666;
  margin: 0 0 20px 0;
  line-height: 1.4;
}

.button {
  padding: 12px 20px;
  background-color: #6fd6be;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: auto;

  &:hover {
    background-color: #5ec4ac;
  }
}

@media (max-width: 768px) {
  .banner:not(.mobile) {
    display: none;
  }
}
</style>
