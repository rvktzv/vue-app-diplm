<template>
  <div :class="$style.carouselContainer">
    <button
      :class="[$style.navButton, $style.prev]"
      @click="prevSlide"
      :disabled="currentIndex === 0"
    >
      &lt;
    </button>

    <div :class="$style.carouselTrack" :style="trackStyle">
      <div
        v-for="(item, index) in items"
        :key="index"
        :class="$style.carouselItem"
      >
        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>
        <button
          :class="$style.detailButton"
          @click="goToDetail(item.id)"
        >
          Подробнее
        </button>
      </div>
    </div>

    <button
      :class="[$style.navButton, $style.next]"
      @click="nextSlide"
      :disabled="currentIndex >= items.length - visibleItems"
    >
      &gt;
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

interface CarouselItem {
  id: number
  title: string
  description: string
}

const props = defineProps<{
  items: CarouselItem[]
}>()

const router = useRouter()
const currentIndex = ref(0)
const itemWidth = 280
const visibleItems = ref(4)

const trackStyle = computed(() => ({
  transform: `translateX(-${currentIndex.value * itemWidth}px)`
}))

const updateVisibleItems = () => {
  const width = window.innerWidth
  if (width < 576) visibleItems.value = 1
  else if (width < 768) visibleItems.value = 2
  else if (width < 992) visibleItems.value = 3
  else visibleItems.value = 4
}

window.addEventListener('resize', updateVisibleItems)
updateVisibleItems()

const nextSlide = () => {
  if (currentIndex.value < props.items.length - visibleItems.value) {
    currentIndex.value++
  }
}

const prevSlide = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}

const goToDetail = (id: number) => {
  // TODO: Заменить на реальный вызов API
  router.push(`/diploma/${id}`)
}
</script>

<style module lang="scss">
.carouselContainer {
  position: relative;
  margin: 40px 0;
  overflow: hidden;
}

.carouselTrack {
  display: flex;
  transition: transform 0.5s ease;
  padding: 20px 0;
}

.carouselItem {
  flex: 0 0 280px;
  margin: 0 10px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
}

/* Остальные стили карусели... */
</style>
