<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4 mb-md-5">📚 Коллекция</h1>

    <!-- Форма добавления -->
    <div class="row justify-content-center mb-4">
      <div class="col-md-10 col-lg-8">
        <form @submit.prevent="addItem" class="input-group flex-nowrap flex-md-wrap">
          <input v-model="form.title" type="text" class="form-control mb-2 mb-md-0" placeholder="Название" required />
          <input v-model="form.description" type="text" class="form-control ms-md-2 mb-2 mb-md-0" placeholder="Описание" />
          <input v-model="form.image" type="text" class="form-control ms-md-2 mb-2 mb-md-0" placeholder="Ссылка на фото (URL)" />
          <button class="btn btn-primary ms-md-2" type="submit">Добавить</button>
        </form>
      </div>
    </div>

    <!-- Сортировка -->
    <div class="row justify-content-center mb-3">
      <div class="col-auto">
        <label class="form-label me-2">Сортировка:</label>
        <select v-model="sortBy" class="form-select form-select-sm d-inline-block w-auto">
          <option value="newest">Сначала новые</option>
          <option value="oldest">Сначала старые</option>
          <option value="az">А → Я</option>
          <option value="za">Я → А</option>
        </select>
      </div>
    </div>

    <!-- Сетка карточек -->
    <div class="row">
      <div v-for="item in sortedItems" :key="item.id" class="col-sm-6 col-md-4 col-lg-3 mb-4">
        <div class="card h-100 shadow-sm">
          <img v-if="item.image" :src="item.image" class="card-img-top" alt="Фото" style="height: 200px; object-fit: cover;" />
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">{{ item.title }}</h5>
            <p class="card-text text-muted small">{{ item.description || 'Без описания' }}</p>
            <div class="mt-auto d-flex justify-content-between align-items-center">
              <button @click="removeItem(item.id)" class="btn btn-sm btn-outline-danger">Удалить</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="items.length === 0" class="text-center text-muted mt-5">
      Коллекция пуста. Добавьте первый элемент!
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      form: { title: '', description: '', image: '' },
      sortBy: 'newest'
    }
  },
  computed: {
    sortedItems() {
      const list = [...this.items]
      switch (this.sortBy) {
        case 'oldest': return list.sort((a, b) => a.id - b.id)
        case 'az': return list.sort((a, b) => a.title.localeCompare(b.title, 'ru'))
        case 'za': return list.sort((a, b) => b.title.localeCompare(a.title, 'ru'))
        default: return list.sort((a, b) => b.id - a.id) // newest
      }
    }
  },
  methods: {
    addItem() {
      if (!this.form.title.trim()) return
      
      this.items.push({
        id: Date.now(),
        title: this.form.title.trim(),
        description: this.form.description.trim(),
        image: this.form.image.trim()
      })
      
      // Очистка формы
      this.form = { title: '', description: '', image: '' }
    },
    removeItem(id) {
      this.items = this.items.filter(item => item.id !== id)
    }
  }
}
</script>