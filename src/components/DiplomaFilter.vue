<template>
  <div :class="$style.filterContainer">
    <div :class="$style.filterRow">
      <SpecialtySelect
        v-model="selectedStudies"
        :specialties="specialties"
        :initialValues="initialStudies"
        @search="handleSpecialtySearch"
      />

      <div :class="$style.subjectInput">
        <input
          v-model="subjectInput"
          type="text"
          placeholder="ключевые слова темы"
          maxlength="50"
          :class="$style.inputField"
          @input="handleSubjectInput"
        >
        <span :class="$style.counter">{{ subjectInput.length }}/50</span>
      </div>

      <button
        :class="[
          $style.searchButton,
          { [$style.loading]: loading }
        ]"
        :disabled="!canSearch"
        @click="handleSearchClick"
      >
        <span v-if="!loading">Найти</span>
        <span v-else>Загрузка...</span>
        <SearchIcon :class="$style.searchIcon" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import SearchIcon from '@/assets/icons/search.svg'
import SpecialtySelect from '@/components/SpecialtySelect.vue'

const props = defineProps({
  specialties: {
    type: Array,
    required: true
  },
  initialStudies: {
    type: Array,
    default: () => []
  },
  initialSubject: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['search'])

// State
const selectedStudies = ref<string[]>([])
const subjectInput = ref('')
const loading = ref(false)
const lastSearchParams = ref<any>(null)

// Computed
const canSearch = computed(() => {
  return selectedStudies.value.length > 0 || subjectInput.value.length > 0
})

// Methods
const handleSpecialtySearch = (query: string) => {
  // In real app would debounce and call API
  console.log('Search specialties:', query)
}

const handleSubjectInput = () => {
  if (subjectInput.value.length > 50) {
    subjectInput.value = subjectInput.value.slice(0, 50)
  }
}

const handleSearchClick = () => {
  if (!canSearch.value) return

  loading.value = true
  const searchParams = {
    studies: selectedStudies.value,
    subject: subjectInput.value
  }

  lastSearchParams.value = searchParams
 // emit('search', searchParams)
 emit('search', {
  studies: selectedItems.value.map(item => item.code),
  subject: subjectInput.value
});
  // Simulate API delay
  setTimeout(() => {
    loading.value = false
  }, 800)
}

// Lifecycle
watch(() => props.initialStudies, (newVal) => {
  selectedStudies.value = [...newVal]
}, { immediate: true })

watch(() => props.initialSubject, (newVal) => {
  subjectInput.value = newVal
}, { immediate: true })
</script>

<style module lang="scss">
.filterContainer {
  margin-bottom: 30px;
}

.filterRow {
  display: flex;
  gap: 15px;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
  }
}

.subjectInput {
  flex: 1;
  position: relative;
  min-width: 200px;

  @media (max-width: 768px) {
    width: 100%;
  }
}

.inputField {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  transition: border-color 0.3s;

  &:focus {
    border-color: #6fd6be;
    outline: none;
    box-shadow: 0 0 0 2px rgba(111, 214, 190, 0.2);
  }

  &::placeholder {
    color: #999;
  }
}

.counter {
  position: absolute;
  right: 10px;
  bottom: -20px;
  font-size: 12px;
  color: #666;
}

.searchButton {
  padding: 12px 20px;
  background-color: #6fd6be;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover:not(:disabled) {
    background-color: #5ec4ac;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &.loading {
    position: relative;
    color: transparent;

    &::after {
      content: "";
      position: absolute;
      width: 16px;
      height: 16px;
      border: 2px solid white;
      border-radius: 50%;
      border-top-color: transparent;
      animation: spin 0.8s linear infinite;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
}

.searchIcon {
  width: 16px;
  height: 16px;
  fill: currentColor;
}

@keyframes spin {
  to { transform: translate(-50%, -50%) rotate(360deg); }
}
</style>
