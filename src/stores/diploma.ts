import { defineStore } from 'pinia'

interface Diploma {
  id: number
  title: string
  description: string
  // TODO: Добавить остальные поля после согласования с API
}

export const useDiplomaStore = defineStore('diploma', {
  state: () => ({
    featuredDiplomas: [
      {
        id: 1,
        title: 'Диплом по экономике',
        description: 'Анализ финансовой деятельности предприятия за 2022-2023 год. 90 стр.'
      },
      {
        id: 2,
        title: 'Диплом по экономике',
        description: 'Анализ финансовой деятельности предприятия за 2022-2023 год. 90 стр.'
      },
      {
        id: 3,
        title: 'Диплом по экономике',
        description: 'Анализ финансовой деятельности предприятия за 2022-2023 год. 90 стр.'
      },
      {
        id: 4,
        title: 'Диплом по экономике',
        description: 'Анализ финансовой деятельности предприятия за 2022-2023 год. 90 стр.'
      },
      {
        id: 5,
        title: 'Диплом по экономике',
        description: 'Анализ финансовой деятельности предприятия за 2022-2023 год. 90 стр.'
      },
      {
        id: 6,
        title: 'Диплом по экономике',
        description: 'Анализ финансовой деятельности предприятия за 2022-2023 год. 90 стр.'
      }
      // Остальные 7 элементов...
    ] as Diploma[]
  }),
  actions: {
    // TODO: Добавить методы для работы с API
    async fetchFeaturedDiplomas() {
      // Реализовать после подключения API
    }
  }
})
