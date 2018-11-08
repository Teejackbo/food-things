<template>
  <Spinner v-if="submitting" :fullScreen="true" />
  <div v-else>
    <h1>Create Food</h1>
    <form @submit.prevent="handleSubmit">
      <InputField
        v-model.trim="food.name"
        type="text"
        placeholder="Bread"
        label="Name"
        name="name"
      />

      <InputField
        v-model.trim="food.description"
        type="text"
        placeholder="Bread is a staple food prepared from a dough of flour and water, usually by baking."
        label="Description"
        name="description"
      />

      <InputField
        v-model.number="food.calories"
        type="text"
        placeholder="120"
        label="Calories per 100g"
        name="calories"
      />

      <InputField
        v-model.number="food.carbs"
        type="text"
        placeholder="45"
        label="Carbs per 100g"
        name="carbs"
      />

      <InputField
        v-model.number="food.protein"
        type="text"
        placeholder="14"
        label="Protein per 100g"
        name="protein"
      />

      <InputField
        v-model.number="food.fat"
        type="text"
        placeholder="20"
        label="Fat per 100g"
        name="fat"
      />

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
