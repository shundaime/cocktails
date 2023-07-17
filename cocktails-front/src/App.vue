<script setup lang="ts">
import Header from './components/layout/AppHeader.vue';
import Main from './components/layout/AppMain.vue';
import Loader from './components/ui/AppLoader.vue';
import Button from './components/ui/AppButton.vue';

import axios from 'axios';
import { ref, onMounted, type Ref } from 'vue';

interface CocktailType {
    idDrink?: string;
    strDrink?: string;
    strDrinkThumb?: string;
    strInstructions?: string;
    strIngredient?: string;
    strMeasure?: string;
    [key: string]: string | undefined;
}

const randomCocktail: Ref<null | CocktailType[]> = ref(null);
const errorMessage = ref('');
const showInstructions = ref(false);
const selectedCocktail = ref();
const loading = ref(true);

type CocktailResponseType = {
    drinks: CocktailType[];
};

// method to call the api
const fetchCocktails = async () => {
    const cocktails = [];
    const ids = new Set();
    errorMessage.value = '';
    loading.value = true;
    while (cocktails.length < 3) {
        try {
            const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php');
            const data: CocktailResponseType = response.data;
            const cocktail = data.drinks[0];
            if (!ids.has(cocktail.idDrink)) {
                cocktails.push(cocktail);
                ids.add(cocktail.idDrink);
            }
        } catch (error) {
            console.error('Error fetching cocktails:', error);
            errorMessage.value = 'An error occurred while fetching cocktails.';
        }
    }
    randomCocktail.value = cocktails;
    loading.value = false;
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

// method to get ingredients and measures in arrays
const getIngredientsAndMeasures = (cocktail: CocktailType) => {
    const ingredients = [];
    const measures = [];
    for (let index = 1; index <= 10; index++) {
        const ingredient = cocktail['strIngredient' + index];
        const measure = cocktail['strMeasure' + index];
        if (ingredient && measure) {
            ingredients.push(ingredient);
            measures.push(measure);
        }
    }
    return { ingredients, measures };
};

onMounted(fetchCocktails);
</script>

<template>
    <div class="flex flex-col w-full h-full gap-4">
        <Header />
        <Main>
            <Loader v-if="loading" />

            <section v-else class="flex flex-col justify-end h-full gap-4">
                <Button text="Fetch new cocktails" @click="fetchCocktails">
                    <ph-martini
                        :size="24"
                        color="#04d9ff"
                        class="transition duration-300 group-hover:scale-110 group-hover:transform-shake"
                /></Button>
                <ul
                    class="flex flex-col gap-4 p-2 mx-auto overflow-auto max-h-fit max-sm:h-[calc(100vh-124px)] sm:p-4 lg:grid lg:grid-cols-3 md:gap-8 lg:gap-12 xl:gap-16 2xl:gap-32"
                >
                    <li v-for="cocktail in randomCocktail" :key="cocktail.idDrink" class="flex w-full group">
                        <transition name="fade" appear>
                            <figure class="relative grid w-full overflow-hidden rounded-lg neon-no-blink">
                                <img
                                    :src="cocktail.strDrinkThumb"
                                    :alt="cocktail.strDrink"
                                    @load="loading = false"
                                    class="object-cover w-full rounded-t-lg h-72 md:h-96"
                                />
                                <caption class="flex flex-col justify-center w-full gap-4 p-4 transition bg-violet-500">
                                    <h2 class="z-10 font-bold">
                                        {{ cocktail.strDrink }}
                                    </h2>
                                    <Button
                                        :text="selectedCocktail === cocktail ? 'Hide details' : 'Show details'"
                                        @click="toggleDetails(cocktail)"
                                    />
                                    <transition name="fade" appear>
                                        <div
                                            v-if="selectedCocktail === cocktail"
                                            class="flex absolute top-0 right-0 flex-col gap-2 p-4 w-full h-full max-h-[calc(100%-124px)] bg-violet-500 rounded-t-lg opacity-90 text-neutral-50"
                                        >
                                            <ul>
                                                <li
                                                    v-for="(ingredient, index) in getIngredientsAndMeasures(cocktail)
                                                        .ingredients"
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
                    </li>
                </ul>
            </section>
        </Main>
    </div>
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
