<template>
  <div :class="$style.pageContainer">
    <nav :class="$style.breadcrumbs">
      <router-link to="/">Главная страница</router-link>
      <span> > </span>
      <router-link to="/diplomas">Дипломы</router-link>
    </nav>

    <h1>{{ pageTitle }}</h1>
    <p v-if="subjectQuery" :class="$style.subtitle">Работа содержит "{{ subjectQuery }}"</p>

    <DiplomaFilter
      :specialties="specialties"
      :initialStudies="initialStudies"
      :initialSubject="initialSubject"
      @search="handleSearch"
    />

    <div :class="$style.contentWrapper">
      <div :class="$style.resultsContainer">
        <template v-if="loading">
          <DiplomaCardSkeleton v-for="n in 10" :key="'skeleton-'+n" />
        </template>

        <template v-else-if="error">
          <ErrorBanner />
        </template>

        <template v-else>
          <template v-for="(item, index) in diplomas" :key="item.inn">
            <DiplomaCard
              :diploma="item"
              :studyName="getStudyName(item.study)"
            />
            <DiplomaBanner
              v-if="shouldShowBanner(index)"
              :isMobile="isMobile"
            />
          </template>
        </template>
      </div>

      <DiplomaBanner
        v-if="!isMobile"
        :class="$style.stickyBanner"
        :isMobile="false"
      />
    </div>

    <PaginationControls
      v-if="showPagination"
      :currentPage="currentPage"
      :totalPages="totalPages"
      @page-change="handlePageChange"
    />

    <AppFooter />
  </div>
  <div v-if="diplomas.length === 0 && !loading" :class="$style.emptyState">
  <img src="@/assets/images/empty.svg" alt="Нет данных">
  <h3>Дипломы не найдены</h3>
  <p>Попробуйте изменить параметры поиска</p>
  <button @click="fetchDiplomas">Повторить попытку</button>
</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { transliterate } from '@/utils/transliterate'
import DiplomaFilter from '@/components/DiplomaFilter.vue'
import DiplomaCard from '@/components/DiplomaCard.vue'
import DiplomaBanner from '@/components/DiplomaBanner.vue'
import PaginationControls from '@/components/PaginationControls.vue'
import DiplomaCardSkeleton from '@/components/DiplomaCardSkeleton.vue'
import ErrorBanner from '@/components/ErrorBanner.vue'
import AppFooter from '@/components/AppFooter.vue'
import { useWindowSize } from '@vueuse/core'

// Mock data imports
import { mockDiplomas } from '@/mocks/diplomas'
import { mockSpecialties } from '@/mocks/specialties'

const route = useRoute()
const router = useRouter()
const { width } = useWindowSize()

// State
const diplomas = ref<any[]>([])
const specialties = ref<any[]>([])
const loading = ref(false)
const error = ref(false)

// Computed
const isMobile = computed(() => width.value < 768)
const initialStudies = computed(() => {
  return route.query.studies ? String(route.query.studies).split(',') : []
})
const initialSubject = computed(() => {
  return route.query.subject ? String(route.query.subject) : ''
})
const currentPage = computed(() => {
  const page = Number(route.query.page) || 1
  return page >= 1 ? page : 1
})
const subjectQuery = computed(() => {
  return route.query.subject ? String(route.query.subject) : ''
})
const pageTitle = computed(() => {
  let title = 'Готовые дипломы'
  if (route.query.studies) {
    const studyCodes = String(route.query.studies).split(',')
    const studyNames = studyCodes.map(code =>
      specialties.value.find(s => s.code === code)?.name || ''
    ).filter(Boolean)
    if (studyNames.length) {
      title += ` по специальности ${studyNames.join(', ')}`
    }
  }
  return title
})
const totalPages = computed(() => {
  return diplomas.value.length ? Math.ceil(27 / 10) : 0 // Mock count 27
})
const showPagination = computed(() => {
  return totalPages.value > 1 && !loading.value && !error.value
})

// Methods
/*const fetchDiplomas = async () => {
  loading.value = true
  error.value = false

  try {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 800))
    diplomas.value = mockDiplomas
  } catch (e) {
    error.value = true
  } finally {
    loading.value = false
  }
}
*/
const fetchDiplomas = async () => {
  try {
    const response = await fetch('baseHostBE/v1/diplomas_search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        studies: route.query.studies,
        subject: route.query.subject,
        page: route.query.page || 1
      })
    });
    diplomas.value = await response.json();
  } catch (e) {
    console.error('Ошибка загрузки:', e);
  }
}
const fetchSpecialties = async (search?: string) => {
  try {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 300))
    specialties.value = mockSpecialties
    if (search) {
      specialties.value = specialties.value.filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase())
      )
    }
  } catch (e) {
    console.error('Failed to fetch specialties', e)
  }
}

const handleSearch = (params: { studies: string[], subject: string }) => {
  const query: any = {}

  if (params.studies.length) {
    query.studies = params.studies.slice(0, 3).join(',')
  }

  if (params.subject) {
    query.subject = params.subject.slice(0, 50)
  }

  router.push({ query })
}

const handlePageChange = (page: number) => {
  router.push({
    query: { ...route.query, page: page > 1 ? page : undefined }
  })
}

const shouldShowBanner = (index: number) => {
  if (!isMobile.value) return false
  return (index + 1) % 5 === 0 || (diplomas.value.length < 5 && index === 0)
}

const getStudyName = (code: string) => {
  return specialties.value.find(s => s.code === code)?.name || ''
}

// Lifecycle
/*
onMounted(() => {
  fetchSpecialties()
  fetchDiplomas()
})*/
onMounted(() => {
  diplomas.value = mockDiplomas; // Временно для проверки
  specialties.value = mockSpecialties;
});
console.log('Дипломы:', diplomas.value);
console.log('Специальности:', specialties.value);
</script>

<style module lang="scss">
.pageContainer {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 20px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.breadcrumbs {
  margin-bottom: 20px;
  font-size: 14px;
  color: #666;

  a {
    color: #666;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  span {
    margin: 0 5px;
  }
}

.subtitle {
  margin-top: -10px;
  margin-bottom: 20px;
  color: #666;
  font-size: 16px;
}

.contentWrapper {
  display: flex;
  gap: 30px;
  margin-top: 20px;
  position: relative;
}

.resultsContainer {
  flex: 1;
  min-width: 0;
}

.stickyBanner {
  position: sticky;
  top: 20px;
  align-self: flex-start;
}

@media (max-width: 768px) {
  .contentWrapper {
    flex-direction: column;
    gap: 20px;
  }

  .stickyBanner {
    display: none;
  }
}

.emptyState {
  text-align: center;
  padding: 40px;
  img {
    width: 200px;
    opacity: 0.6;
  }
  button {
    margin-top: 20px;
    padding: 10px 20px;
    background: #6fd6be;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
}
</style>
