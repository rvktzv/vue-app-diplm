<template>
  <div :class="$style.carouselWrapper">
    <h2 :class="$style.sectionTitle">Готовые работы</h2>
    <div>
      <button
        :class="$style.actionButton"
        @click="showFilters()"

      >Название кнопки какое-то
        &lt;
      </button>
    </div>
    <div :class="$style.carouselContainer">
      <button
        :class="[$style.navButton, $style.prev]"
        @click="prevSlide"
        :disabled="currentIndex === 0"
      >
        &lt;
      </button>

      <div v-if="loading" :class="$style.loader">Загрузка...</div>

      <div v-else :class="$style.carouselTrack" :style="trackStyle">
        <div
          v-for="(item, index) in items"
          :key="index"
          :class="$style.carouselItem"
        >
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
          <button
            :class="$style.detailsButton"
            @click="showDetails(item)"
          >
            Подробнее
          </button>
        </div>
      </div>

      <button
        :class="[$style.navButton, $style.next]"
        @click="nextSlide"
        :disabled="currentIndex >= items.length - visibleItems || loading"
      >
        &gt;
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { transliterate } from '@/utils/transliterate'
import { ref, computed, onMounted } from 'vue'
import router from '@/router/index.ts'

interface Organization {
  title: string
  description: string
  inn: string
  address: string
  originalData: any
}

const items = ref<Organization[]>([])
const loading = ref(true)
const currentIndex = ref(0)
const itemWidth = 300
const visibleItems = ref(4)

const trackStyle = computed(() => ({
  transform: `translateX(-${currentIndex.value * itemWidth}px)`
}))

const fetchOrganizations = async () => {
  try {
    loading.value = true
    const response = await fetch('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
     /*   'Authorization': 'Token 30bfea4cdb9fd6d4032a70b93ad66924281164ac'*/
      },
      body: JSON.stringify({
        query: "сбербанк",
        status: ["ACTIVE"],
        count: 8 // Получаем 8 организаций для карусели
      })
    })

    const data = await response.json()

    items.value = data.suggestions.map((suggestion: any) => ({
      title: suggestion.unrestricted_value,
      description: `${suggestion.data.address.value}, ИНН: ${suggestion.data.inn}`,
      inn: suggestion.data.inn,
      address: suggestion.data.address.value,
      originalData: suggestion.data
    }))

  } catch (error) {
    console.error('Ошибка при загрузке данных:', error)
    // Fallback данные на случай ошибки
    items.value = [
      {
        title: "ПАО СБЕРБАНК",
        description: "г Москва, ул Вавилова, д 19, ИНН: 7707083893",
        inn: "7707083893",
        address: "г Москва, ул Вавилова, д 19",
        originalData: {}
      }
    ]
  } finally {
    loading.value = false
  }
}

const showDetails = (item: Organization) => {
  const slug = `${item.inn}-${transliterate(item.title)}`
  router.push(`/diplomas/${slug}`)
}

const showFilters = () => {
 // const slug = `${item.inn}-${transliterate(item.title)}`
  router.push(`/diplomas/`)
}

const updateVisibleItems = () => {
  const width = window.innerWidth
  if (width < 576) visibleItems.value = 1
  else if (width < 768) visibleItems.value = 2
  else if (width < 992) visibleItems.value = 3
  else visibleItems.value = 4
}

const nextSlide = () => {
  if (currentIndex.value < items.value.length - visibleItems.value) {
    currentIndex.value++
  }
}

const prevSlide = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}

onMounted(() => {
  fetchOrganizations()
  window.addEventListener('resize', updateVisibleItems)
  updateVisibleItems()
})
</script>

<style module lang="scss">
.carouselWrapper {
  width: 100%;
  padding: 60px 0;
  background: white;
}

.sectionTitle {
  text-align: center;
  margin-bottom: 40px;
  font-size: 2rem;
  color: #2c3e50;
}

.carouselContainer {
  position: relative;
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 60px;
}

.actionButton {
  flex: 0 0 auto;
  padding: 27px 40px;
  background-color: #6fd6be;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  min-width: 220px;

  &:hover {
    background-color: #37ebc1;
  }
}

.loader {
  text-align: center;
  padding: 60px 0;
  font-size: 1.2rem;
  color: #666;
}

.carouselTrack {
  display: flex;
  transition: transform 0.5s ease;
  gap: 20px;
  padding: 10px 0;
}

.carouselItem {
  flex: 0 0 280px;
  padding: 25px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  }

  h3 {
    font-size: 1.2rem;
    margin-bottom: 15px;
    color: #2c3e50;
    min-height: 3em;
  }

  p {
    color: #666;
    line-height: 1.5;
    margin-bottom: 20px;
    font-size: 0.9rem;
  }
}

.detailsButton {
  width: 100%;
  padding: 12px;
  background: #8fd3c6;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #7abfaf;
  }
}

.navButton {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  background: #8fd3c6;
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 1.2rem;
  cursor: pointer;
  z-index: 10;
  transition: background 0.3s;

  &:hover:not(:disabled) {
    background: #7abfaf;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.prev {
  left: 10px;
}

.next {
  right: 10px;
}

@media (max-width: 1200px) {
  .carouselContainer {
    padding: 0 40px;
  }
}

@media (max-width: 768px) {
  .carouselContainer {
    padding: 0 20px;
  }

  .sectionTitle {
    font-size: 1.5rem;
    margin-bottom: 30px;
  }
}
</style>
