<template>
  <div :class="$style.selectWrapper">
    <div
      :class="$style.selectTrigger"
      @click="toggleDropdown"
    >
      <span v-if="selectedItems.length === 0" :class="$style.placeholder">
        Выберите специальность
      </span>
      <div v-else :class="$style.selectedItems">
        <span
          v-for="item in displaySelectedItems"
          :key="item.code"
          :class="$style.selectedItem"
        >
          {{ truncate(item.name) }}
        </span>
      </div>
      <ChevronIcon :class="[$style.chevron, { [$style.rotated]: isOpen }]" />
    </div>

    <transition name="fade">
      <div v-if="isOpen" :class="$style.dropdown">
        <div :class="$style.searchInput">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Поиск специальности..."
            @input="handleSearch"
          >
          <SearchIcon :class="$style.searchIcon" />
        </div>

        <div :class="$style.dropdownList">
          <div v-if="filteredItems.length === 0" :class="$style.noResults">
            Нет специальности
          </div>

          <template v-else>
            <div
              v-for="item in filteredItems"
              :key="item.code"
              :class="[$style.dropdownItem, { [$style.selected]: isSelected(item.code) }]"
              @click="toggleItem(item)"
            >
              <span>{{ item.name }}</span>
              <CheckIcon v-if="isSelected(item.code)" :class="$style.checkIcon" />
            </div>
          </template>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
//import ChevronIcon from '@/assets/icons/chevron-down.svg?component'
//import SearchIcon from '@/assets/icons/search.svg?component'
//import CheckIcon from '@/assets/icons/check.svg?component'
import ChevronIcon from '@/assets/icons/chevron-down.svg'
import SearchIcon from '@/assets/icons/search.svg'
import CheckIcon from '@/assets/icons/check.svg'

interface Specialty {
  code: string
  name: string
}

const props = defineProps<{
  specialties: Specialty[]
  initialValues?: string[]
}>()

const emit = defineEmits(['update:modelValue', 'search'])

const isOpen = ref(false)
const searchQuery = ref('')
const selectedItems = ref<Specialty[]>([])

// Computed
//const filteredItems = computed(() => {
 // return props.specialties.filter(item =>
 //   item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
//})
//const filteredItems = computed(() => {
 // return props.specialties.filter(item => item.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
//})
const filteredItems = computed(() => {
  return props.specialties.filter(item =>
    item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  ) // <-- Убедитесь, что скобки правильно закрыты
})

const displaySelectedItems = computed(() => {
  return selectedItems.value.slice(0, 2)
})

// Methods
const toggleDropdown = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    searchQuery.value = ''
  }
}

const handleSearch = () => {
  emit('search', searchQuery.value)
}

const isSelected = (code: string) => {
  return selectedItems.value.some(item => item.code === code)
}

const toggleItem = (item: Specialty) => {
  if (isSelected(item.code)) {
    selectedItems.value = selectedItems.value.filter(i => i.code !== item.code)
  } else {
    if (selectedItems.value.length < 3) {
      selectedItems.value.push(item)
    }
  }
}

const truncate = (text: string, max = 20) => {
  return text.length > max ? text.slice(0, max) + '...' : text
}

// Lifecycle
watch(() => props.initialValues, (newVal) => {
  if (newVal && newVal.length > 0) {
    selectedItems.value = props.specialties
      .filter(item => newVal.includes(item.code))
      .slice(0, 3)
  }
}, { immediate: true })

watch(selectedItems, (newVal) => {
  emit('update:modelValue', newVal.map(item => item.code))
}, { deep: true })
</script>

<style module lang="scss">
.selectWrapper {
  position: relative;
  min-width: 250px;
  flex: 1;

  @media (max-width: 768px) {
    width: 100%;
  }
}

.selectTrigger {
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  transition: border-color 0.3s;

  &:hover {
    border-color: #bbb;
  }
}

.placeholder {
  color: #999;
}

.selectedItems {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  max-height: 40px;
  overflow: hidden;
}

.selectedItem {
  background-color: #f0f0f0;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 14px;
  white-space: nowrap;
}

.chevron {
  width: 16px;
  height: 16px;
  transition: transform 0.2s;

  &.rotated {
    transform: rotate(180deg);
  }
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 10;
  margin-top: 5px;
  overflow: hidden;
}

.searchInput {
  position: relative;
  padding: 10px;
  border-bottom: 1px solid #eee;

  input {
    width: 100%;
    padding: 8px 30px 8px 10px;
    border: 1px solid #ddd;
    border-radius: 4px;

    &:focus {
      outline: none;
      border-color: #6fd6be;
    }
  }
}

.searchIcon {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  fill: #999;
}

.dropdownList {
  max-height: 300px;
  overflow-y: auto;
}

.dropdownItem {
  padding: 10px 15px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f9f9f9;
  }

  &.selected {
    background-color: #f0f9f6;
    color: #2c7d63;
  }
}

.checkIcon {
  width: 16px;
  height: 16px;
  fill: #2c7d63;
}

.noResults {
  padding: 15px;
  text-align: center;
  color: #999;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
