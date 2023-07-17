<script setup lang="ts">
import Button from './components/v-button.vue';
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

type CocktailResponseType = {
    drinks: CocktailType[];
};

const fetchCocktails = async () => {
    const cocktails = [];
    const ids = new Set();
    errorMessage.value = '';
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
};

const toggleInstructions = (cocktail: CocktailType) => {
    if (selectedCocktail.value === cocktail) {
        selectedCocktail.value = null;
    } else {
        selectedCocktail.value = cocktail;
    }
    showInstructions.value = false;
};

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
    <div class="flex flex-col justify-between w-full h-full gap-4 m-auto">
        <header class="relative flex justify-center mx-auto text-center h-fit w-fit">
            <h1>Cocktail <span>Paradise</span></h1>
            <span class="neon">Open</span>
        </header>
        <main class="flex flex-col gap-2">
            <div
                v-if="errorMessage"
                class="absolute p-4 my-auto font-sans bg-red-300 rounded-md top-4 right-4 left-4 text-red-950"
            >
                {{ errorMessage }}
            </div>
            <div
                class="absolute top-0 left-0 z-20 flex items-center justify-center w-full h-full gap-4 m-auto text-4xl font-bold rounded-md opacity-60 bg-neutral-900"
                v-if="!randomCocktail"
            >
                Loading...
                <ph-circle-notch :size="32" weigt="bold" color="#04d9ff" class="spinner" />
            </div>
            <section v-else class="flex flex-col gap-4">
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
                                    class="object-cover w-full rounded-t-lg h-72 md:h-96"
                                />
                                <caption class="flex flex-col justify-center w-full gap-4 p-4 transition bg-violet-500">
                                    <h2 class="z-10 font-bold">
                                        {{ cocktail.strDrink }}
                                    </h2>
                                    <Button
                                        :text="selectedCocktail === cocktail ? 'Hide details' : 'Show details'"
                                        @click="toggleInstructions(cocktail)"
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
        </main>
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
