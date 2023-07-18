<template>
    <transition name="fade" appear>
        <figure class="relative grid w-full overflow-hidden rounded-lg neon-no-blink">
            <img
                :src="cocktail.strDrinkThumb"
                :alt="cocktail.strDrink"
                class="object-cover w-full rounded-t-lg h-72 md:h-96"
            />
            <caption class="flex flex-col justify-center w-full gap-4 p-4 transition bg-violet-500">
                <h2>
                    {{ cocktail.strDrink }}
                </h2>
                <AppButton text="Show details" :isDisabled="false" @action="toggleDetails(cocktail)" />
            </caption>
            <transition name="fade" appear>
                <div
                    v-if="selectedCocktail === cocktail"
                    class="absolute top-0 right-0 flex flex-col w-full h-full gap-4 p-4 overflow-auto overflow-x-hidden text-2xl text-left rounded-t-lg bg-violet-500 opacity-90 text-neutral-50"
                >
                    <AppButton
                        class="absolute right-0 border-none hover:shadow-none hover:bg-violet-500 top-1 focus:border-none hover:scale-105"
                        text=""
                        :isDisabled="false"
                        @action="toggleDetails(cocktail)"
                    >
                        <ph-x-circle :size="32" color="#04d9ff" />
                    </AppButton>
                    <ul>
                        <li class="font-bold">Ingredients</li>
                        <li v-for="(ingredient, index) in getIngredientsAndMeasures(cocktail).ingredients" :key="index">
                            {{ ingredient }} :
                            {{ getIngredientsAndMeasures(cocktail).measures[index] }}
                        </li>
                    </ul>
                    <ul>
                        <li class="font-bold">Instructions</li>
                        <li>{{ cocktail.strInstructions }}</li>
                    </ul>
                </div>
            </transition>
        </figure>
    </transition>
</template>

<script setup lang="ts">
import type { CocktailType } from '@/shared/interface/CocktailType';
import AppButton from './AppButton.vue';
import { ref } from 'vue';

const props = defineProps<{ cocktail: CocktailType; loading: boolean }>();
const emit = defineEmits<(e: 'toggleDetails', cocktail: CocktailType) => void>();

const showInstructions = ref(false);
const selectedCocktail = ref();

const getIngredientsAndMeasures = (cocktail: CocktailType) => {
    const ingredients = [];
    const measures = [];
    for (let index = 1; index <= 15; index++) {
        const ingredient = cocktail['strIngredient' + index];
        const measure = cocktail['strMeasure' + index];
        if (ingredient && measure) {
            ingredients.push(ingredient);
            measures.push(measure);
        }
    }
    return { ingredients, measures };
};

// method to show details of target cocktail
const toggleDetails = (cocktail: CocktailType) => {
    if (selectedCocktail.value === cocktail) {
        selectedCocktail.value = null;
    } else {
        selectedCocktail.value = cocktail;
    }
    showInstructions.value = false;
};
</script>

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
