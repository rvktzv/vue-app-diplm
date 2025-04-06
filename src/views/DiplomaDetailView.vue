<template>
  <div :class="$style.pageContainer">
    <!-- Хлебные крошки -->
    <nav :class="$style.breadcrumbs">
      <router-link to="/">Главная страница</router-link>
      <span> > </span>
      <router-link to="/diplomas">Дипломы</router-link>
      <span> > </span>
      <span>{{ organization?.name?.full_with_opf || 'Загрузка...' }}</span>
    </nav>

    <!-- Основной контент -->
    <div v-if="loading" :class="$style.loader">Загрузка данных...</div>

    <template v-else-if="organization">
      <!-- Заголовок -->
      <h1 :class="$style.title">{{ organization.name?.full_with_opf }}</h1>

      <!-- Чипсы -->
      <div :class="$style.chips">
        <span v-if="organization.kpp" :class="$style.chip">КПП: {{ organization.kpp }}</span>
        <span v-if="organization.type" :class="$style.chip">Тип: {{ organization.type }}</span>
      </div>

      <!-- ОКВЭДы -->
      <h2 :class="$style.sectionTitle">ОКВЭДы</h2>
      <ol :class="$style.okvedList">
        <li v-for="(okved, index) in organization.okveds" :key="index">
          {{ okved.name }}
        </li>
      </ol>

      <!-- Кнопка заказа -->
      <button :class="$style.orderButton" @click="openModal">
        Заказать диплом по этой организации
      </button>

      <!-- Лицензии -->

    <div v-if="hasLicenses" :class="$style.licenses">
  <h2 :class="$style.sectionTitle">Лицензии</h2>
  <div v-for="(license, index) in visibleLicenses" :key="index" :class="$style.licenseItem">
    <pre v-if="license.startsWith('{')">{{ license }}</pre>
    <template v-else>{{ license }}</template>
  </div>
</div>
    </template>

    <NotFoundView v-else />

    <!-- Футер -->
    <AppFooter />

    <!-- Модальное окно -->
    <ModalForm v-if="showModal" @close="closeModal" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
//import { useRoute, useRouter } from 'vue-router'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { transliterate } from '@/utils/transliterate'
import { parseOrganizationUrl } from '@/utils/urlParser'
import AppFooter from '@/components/AppFooter.vue'
import ModalForm from '@/components/ModalForm.vue'
import NotFoundView from '@/views/NotFoundView.vue'

interface Organization {
  inn: string
  kpp?: string
  type?: string
  name?: {
    full_with_opf: string
  }
  okveds?: Array<{
    name: string
  }>
  licenses?: string[]
  [key: string]: any
}

const route = useRoute()
const router = useRouter()
const organization = ref<Organization | null>(null)
const loading = ref(true)
const showModal = ref(false)
const { id } = defineProps<{
  id: string
}>()

const fetchOrganization = async (inn: string) => {
  try {
    loading.value = true
    console.log(`Отправка запроса для INN: ${inn}`)

const response = await axios.post(
  '/api/findById/party', // Теперь используем прокси
  { query: inn },
  {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Token 30bfea4cdb9fd6d4032a70b93ad66924281164ac'
    }
  }
)
    console.log('Ответ API:', response.data)

    if (response.data.suggestions && response.data.suggestions.length > 0) {
      const data = response.data.suggestions[0].data
      organization.value = {
        ...data,
        name: data.name || { full_with_opf: response.data.suggestions[0].value }
      }

      // Проверка URL
      const expectedSlug = `${data.inn}-${transliterateForUrl(suggestion.value)}`
     // const expectedSlug = `${data.inn}-${transliterate(response.data.suggestions[0].value)}`
      if (route.params.id !== expectedSlug) {
        router.replace(`/diplomas/${expectedSlug}`)
      }
    } else {
      organization.value = null
    }
  } catch (error) {
    console.error('Полная ошибка:', error)
    if (axios.isAxiosError(error)) {
      console.error('Детали ошибки:',
        error.response?.status,
        error.response?.data
      )
    }
    organization.value = null
  } finally {
    loading.value = false
  }
}

const hasLicenses = computed(() => {
  return organization.value?.licenses?.some(license => {
    if (typeof license === 'string') {
      return license.trim().length > 0
    }
    return license && Object.keys(license).length > 0
  }) ?? false
})

const visibleLicenses = computed(() => {
  if (!organization.value?.licenses) return []

  return organization.value.licenses
    .filter(license => {
      if (typeof license === 'string') {
        return license.trim().length > 0
      }
      return license && Object.keys(license).length > 0
    })
    .slice(0, 6)
    .map(license => {
      if (typeof license === 'string') return license
      return JSON.stringify(license, null, 2)
    })
})

const openModal = () => {
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

onMounted(() => {

 const inn = parseOrganizationUrl(id) // Используем переданный id

  if (inn) {
    fetchOrganization(inn)
  } else {
    organization.value = null
    loading.value = false
  }
})

watch(() => route.params.id, (newId) => {
  const inn = parseOrganizationUrl(newId as string)
  if (inn) {
    fetchOrganization(inn)
  }
})
</script>

<style module lang="scss">
.pageContainer {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.breadcrumbs {
  margin-bottom: 30px;
  font-size: 0.9rem;
  color: #666;

  a {
    color: #8fd3c6;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  span:last-child {
    color: #333;
  }
}

.loader {
  text-align: center;
  padding: 100px 0;
  font-size: 1.2rem;
  color: #666;
  flex: 1;
}

.title {
  color: #2c3e50;
  margin-bottom: 30px;
  font-size: 2rem;
}

.chips {
  display: flex;
  gap: 15px;
  margin-bottom: 40px;
}

.chip {
  background: #e0f2f1;
  color: #00796b;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
}

.sectionTitle {
  color: #2c3e50;
  margin: 30px 0 20px;
  font-size: 1.5rem;
}

.okvedList {
  padding-left: 25px;
  margin-bottom: 40px;

  li {
    margin-bottom: 10px;
    line-height: 1.5;
    color: #555;
  }
}

.orderButton {
  align-self: flex-start;
  background: #8fd3c6;
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 40px;
  transition: background 0.3s;

  &:hover {
    background: #7abfaf;
  }
}

.licenses {
  margin-bottom: 60px;
}

.licenseItem {
  background: #f5f5f5;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
  line-height: 1.5;
  color: #555;
}
</style>
