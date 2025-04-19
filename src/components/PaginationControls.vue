<template>
  <div :class="$style.pagination">
    <button
      :class="[$style.arrowButton, $style.prev]"
      :disabled="currentPage === 1"
      @click="goToPage(currentPage - 1)"
    >
      <ChevronIcon :class="$style.chevron" />
    </button>

    <template v-for="page in visiblePages" :key="page">
      <button
        v-if="page === '...'"
        :class="$style.ellipsis"
        disabled
      >
        ...
      </button>
      <button
        v-else
        :class="[
          $style.pageButton,
          { [$style.active]: page === currentPage }
        ]"
        @click="goToPage(page)"
      >
        {{ page }}
      </button>
    </template>

    <button
      :class="[$style.arrowButton, $style.next]"
      :disabled="currentPage === totalPages"
      @click="goToPage(currentPage + 1)"
    >
      <ChevronIcon :class="$style.chevron" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import ChevronIcon from '@/assets/icons/chevron-down.svg?component'

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['page-change'])

const visiblePages = computed(() => {
  const pages = []
  const maxVisible = 5
  let start = 1
  let end = props.totalPages

  if (props.totalPages > maxVisible) {
    start = Math.max(1, props.currentPage - 2)
    end = Math.min(props.totalPages, props.currentPage + 2)

    if (start > 1) {
      pages.push(1)
      if (start > 2) pages.push('...')
    }

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    if (end < props.totalPages) {
      if (end < props.totalPages - 1) pages.push('...')
      pages.push(props.totalPages)
    }
  } else {
    for (let i = 1; i <= props.totalPages; i++) {
      pages.push(i)
    }
  }

  return pages
})

const goToPage = (page: number) => {
  if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
    emit('page-change', page)
  }
}
</script>

<style module lang="scss">
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  margin: 30px 0;
}

.pageButton {
  width: 40px;
  height: 40px;
  border: 1px solid #ddd;
  background-color: white;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(.active) {
    background-color: #f5f5f5;
  }

  &.active {
    background-color: #6fd6be;
    color: white;
    border-color: #6fd6be;
  }
}

.ellipsis {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
}

.arrowButton {
  width: 40px;
  height: 40px;
  border: 1px solid #ddd;
  background-color: white;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background-color: #f5f5f5;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &.prev .chevron {
    transform: rotate(90deg);
  }

  &.next .chevron {
    transform: rotate(-90deg);
  }
}

.chevron {
  width: 16px;
  height: 16px;
  fill: currentColor;
}

@media (max-width: 576px) {
  .pageButton,
  .ellipsis,
  .arrowButton {
    width: 36px;
    height: 36px;
    font-size: 14px;
  }
}
</style>
