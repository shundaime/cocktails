<template>
    <transition name="fade" appear>
        <figure class="grid overflow-hidden relative w-full rounded-lg neon-no-blink">
            <img
                :src="cocktail.strDrinkThumb"
                :alt="cocktail.strDrink"
                class="object-cover w-full h-72 rounded-t-lg md:h-96"
            />
            <caption class="flex flex-col gap-4 justify-center p-4 w-full bg-violet-500 transition">
                <h2 class="z-10 font-bold">
                    {{ cocktail.strDrink }}
                </h2>
                <AppButton
                    :text="selectedCocktail === cocktail ? 'Hide details' : 'Show details'"
                    :isDisabled="false"
                    @action="toggleDetails(cocktail)"
                />
                <transition name="fade" appear>
                    <div
                        v-if="selectedCocktail === cocktail"
                        class="flex absolute top-0 right-0 flex-col gap-2 p-4 w-full h-full max-h-[calc(100%-124px)] bg-violet-500 rounded-t-lg opacity-90 text-neutral-50"
                    >
                        <ul>
                            <li
                                v-for="(ingredient, index) in getIngredientsAndMeasures(cocktail).ingredients"
                                :key="index"
                            >
                                {{ ingredient }} :
                                {{ getIngredientsAndMeasures(cocktail).measures[index] }}
                            </li>
                        </ul>
                        <p class="overflow-auto">{{ cocktail.strInstructions }}</p>
                    </div>
                </transition>
            </caption>
        </figure>
    </transition>
</template>

<script setup lang="ts">

import type { CocktailType } from '@/shared/interface/CocktailType';
import AppButton from './AppButton.vue';
import { toRefs, ref } from 'vue';

const props = defineProps<{ cocktail: CocktailType, selectedCocktail: CocktailType | null, loading: boolean }>()
const emit = defineEmits<{
    (e: 'toggleDetails', cocktail: CocktailType): void
  }>()

  const showInstructions = ref(false);

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

const { selectedCocktail } = toRefs(props);

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
