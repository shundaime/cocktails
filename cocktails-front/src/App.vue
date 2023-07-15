<script setup lang="ts">
import axios from 'axios'
import { ref, onMounted, type Ref } from 'vue'

interface CocktailType {
  idDrink?: string
  strDrink?: string
  strDrinkThumb?: string
  strInstructions?: string
}

const randomCocktail: Ref<null | CocktailType[]> = ref(null)
const errorMessage = ref('')
const showInstructions = ref(false)
const selectedCocktail = ref()

type CocktailResponseType = {
  drinks: CocktailType[]
}

const fetchCocktails = async () => {
  const cocktails = []
  const ids = new Set()
  while (cocktails.length < 3) {
    try {
      const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php')
      const data: CocktailResponseType = response.data
      const cocktail = data.drinks[0]
      if (!ids.has(cocktail.idDrink)) {
        cocktails.push(cocktail)
        ids.add(cocktail.idDrink)
      }
    } catch (error) {
      console.error('Error fetching cocktails:', error)
      errorMessage.value = 'An error occurred while fetching cocktails.'
    }
  }
  randomCocktail.value = cocktails
}

const toggleInstructions = (cocktail: CocktailType) => {
  if (selectedCocktail.value === cocktail) {
    selectedCocktail.value = null
  } else {
    selectedCocktail.value = cocktail
  }
  showInstructions.value = false
}

onMounted(fetchCocktails)
</script>

<template>
  <section class="flex flex-col justify-between w-full h-full gap-4 m-auto">
    <div class="relative flex justify-center mx-auto text-center h-fit w-fit">
      <h1>Cocktail <span>Paradise</span></h1>
      <span class="neon">Open</span>
    </div>
    <div v-if="errorMessage" class="w-full p-4 my-auto bg-red-300 rounded-md text-red-950">
      {{ errorMessage }}
    </div>
    <div v-else class="flex flex-col justify-center gap-4 sm:gap-8">
      <button
        class="flex gap-1 px-2 py-1 mx-auto transition duration-500 border-2 rounded-lg bg-violet-500 group border-neon-500 w-fit hover:bg-violet-400 hover:shadow-lg hover:shadow-neon-500"
        @click="fetchCocktails"
        v-if="randomCocktail"
      >
        Fetch new cocktails
        <ph-martini
          :size="24"
          color="#04d9ff"
          class="transition duration-300 group-hover:scale-110 group-hover:transform-shake"
        />
      </button>
      <ul
        v-if="randomCocktail"
        class="flex flex-col items-end h-full gap-4 p-4 mx-auto overflow-auto lg:grid lg:grid-cols-3 md:gap-8 lg:gap-12 xl:gap-16 2xl:gap-32"
      >
        <transition-group name="fade" appear>
          <li
            v-for="cocktail in randomCocktail"
            :key="cocktail.idDrink"
            class="flex overflow-hidden neon-no-blink group"
          >
            <figure class="grid">
              <img
                :src="cocktail.strDrinkThumb"
                :alt="cocktail.strDrink"
                class="object-cover w-full h-72 sm:h-96 md:h-full"
              />
              <caption
                class="flex flex-col justify-center w-full gap-4 p-4 transition bg-violet-500 opacity-90 group-hover:opacity-100"
              >
                <h2 class="p-2">
                  {{ cocktail.strDrink }}
                </h2>
                <button
                  @click="toggleInstructions(cocktail)"
                  class="px-2 py-1 mx-auto text-white rounded-lg bg-violet-500 neon-no-blink w-fit"
                >
                  {{ selectedCocktail === cocktail ? 'Hide Instructions' : 'Show Instructions' }}
                </button>
                <p v-if="selectedCocktail === cocktail" class="p-2 text-white bg-black rounded-lg">
                  {{ cocktail.strInstructions }}
                </p>
              </caption>
            </figure>
          </li>
        </transition-group>
      </ul>
      <div
        class="absolute flex items-center justify-center w-full gap-4 m-auto text-4xl font-bold rounded-md right-4 left-4 top-1/2 bg-violet-400"
        v-else
      >
        Loading...
        <ph-circle-notch :size="32" weigt="bold" color="#04d9ff" class="spinner" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}
</style>
