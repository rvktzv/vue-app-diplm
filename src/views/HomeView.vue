<template>
  <div :class="$style.homePage">
    <!-- 1. Главный баннер -->
    <section :class="$style.heroBanner">
      <div :class="$style.container">
        <div :class="$style.heroContent">
          <div :class="$style.textContent">
            <h1>Профессиональное написание дипломных работ на заказ</h1>
            <p>Качественные работы от экспертов с многолетним опытом. Гарантия уникальности и сроков.</p>
          </div>
          <div :class="$style.imagePlaceholder"></div>
        </div>
      </div>
    </section>

    <!-- 2. Блок текста -->
    <section :class="$style.textBlock">
      <div :class="$style.container">
        <p>Наша компания специализируется на написании дипломных работ для студентов различных вузов. Мы работаем с 2010 года и за это время помогли более чем 5000 студентов защитить свои дипломы на отлично. Наши авторы - это преподаватели вузов, кандидаты и доктора наук, которые знают все требования к оформлению и содержанию дипломных работ.</p>
        <p>Каждая работа проходит проверку на уникальность с помощью системы Антиплагиат.ВУЗ. Мы гарантируем конфиденциальность и соблюдение всех сроков. В случае необходимости, наши специалисты бесплатно доработают работу в соответствии с замечаниями научного руководителя.</p>
      </div>
    </section>

    <!-- 3. Блок с кнопкой, списком и лого -->
    <section :class="$style.actionBlock">
      <div :class="$style.container">
        <div :class="$style.actionContent">
          <button :class="$style.modalButton" @click="openModal">
            Заказать диплом
          </button>

          <ol :class="$style.numberedList">
            <li>Вы оставляете заявку с требованиями к работе</li>
            <li>Мы подбираем подходящего автора-эксперта</li>
            <li>Вы вносите предоплату 30% от суммы</li>
            <li>Автор выполняет работу в указанный срок</li>
            <li>Вы проверяете и оплачиваете оставшуюся сумму</li>
          </ol>

          <div :class="$style.logoContainer">
            <img src="@/assets/images/logo.png" alt="Логотип компании" :class="$style.logo">
          </div>
        </div>
      </div>
    </section>

    <!-- 4. Заголовок -->
    <h2 :class="$style.sectionTitle">Примеры наших работ</h2>

    <!-- 5. Карусель -->
    <CarouselComponent :items="diplomas" />

    <!-- 6. Футер -->
    <AppFooter />

    <!-- Модальное окно -->
    <ModalForm v-if="showModal" @close="closeModal" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useDiplomaStore } from '@/stores/diploma'
import CarouselComponent from '@/components/CarouselComponent.vue'
//import ModalForm from '@/components/ModalForm.vue'
import AppFooter from '@/components/AppFooter.vue'

const diplomaStore = useDiplomaStore()
const diplomas = diplomaStore.featuredDiplomas

const showModal = ref(false)

const openModal = () => {
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}
</script>

<style module lang="scss">
.homePage {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.heroBanner {
  background-color: #b1e2d3;
  padding: 80px 0;

  @media (max-width: 768px) {
    padding: 40px 0;
  }
}

.heroContent {
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
}

.textContent {
  width: 60%;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 20px;
    color: #2c3e50;
  }

  p {
    font-size: 1.2rem;
    color: #34495e;
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 30px;

    h1 {
      font-size: 1.8rem;
    }

    p {
      font-size: 1rem;
    }
  }
}

/* Остальные стили... */
</style>
