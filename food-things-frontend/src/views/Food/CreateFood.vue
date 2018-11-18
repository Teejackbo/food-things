<template>
  <Spinner v-if="submitting" :fullScreen="true" />
  <div v-else>
    <h1>Create Food</h1>
    <form @submit.prevent="handleSubmit">
      <InputField
        v-model.trim="food.name"
        placeholder="Bread"
        name="name"
      >
        <label for="name">Name</label>
      </InputField>

      <InputField
        v-model.trim="food.description"
        placeholder="Bread is a staple food prepared from a dough of flour and water, usually by baking."
        name="description"
      >
        <label for="description">Description</label>
      </InputField>

      <InputField
        v-model.number="food.calories"
        placeholder="120"
        name="calories"
      >
        <label for="calories">Calories per 100g</label>
      </InputField>

      <InputField
        v-model.number="food.carbs"
        placeholder="45"
        name="carbs"
      >
        <label for="carbs">Carbs per 100g</label>
      </InputField>

      <InputField
        v-model.number="food.protein"
        placeholder="14"
        name="protein"
      >
        <label for="protein">Protein per 100g</label>
      </InputField>

      <InputField
        v-model.number="food.fat"
        placeholder="20"
        name="fat"
      >
        <label for="fat">Fat per 100g</label>
      </InputField>

      <PrimaryButton type="success">Create</PrimaryButton>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import isEmpty from 'lodash/isEmpty'
import { CREATE_FOOD_ACTION } from '@/store/modules/food/types'

export default {
  name: 'CreateFood',

  data: () => ({
    food: {
      name: null,
      description: null,
      calories: null,
      carbs: null,
      protein: null,
      fat: null,
    },
    submitting: false,
  }),

  computed: mapState({
    createdFood: state => state.food.selectedFood,
  }),

  methods: {
    ...mapActions({
      createFood: CREATE_FOOD_ACTION,
    }),

    async handleSubmit() {
      this.submitting = true
      await this.createFood(this.food)
      this.submitting = false

      if (!isEmpty(this.createdFood)) this.$router.push({ name: 'home' })
    },
  },
}
</script>
