<script setup lang="ts">
import { ref, onMounted, type Ref } from 'vue';

// layout
import Header from './components/layout/AppHeader.vue';
import Main from './components/layout/AppMain.vue';

// tools
import AppButton from './components/tools/AppButton.vue';
import AppError from './components/tools/AppError.vue';
import AppLoader from './components/tools/AppLoader.vue';
import AppCard from './components/tools/AppCard.vue';

// service
import { fetchApi } from './shared/api/fetchApi';

// interface
import type { CocktailType } from './shared/interface/CocktailType';

const randomCocktail: Ref<null | CocktailType[]> = ref(null);
const errorMessage = ref('');
const loading = ref(true);
const loadData = ref(true);

// method to call the api
const fetchCocktails = async () => {
    const cocktails: CocktailType[] = [];
    const ids = new Set();
    errorMessage.value = '';
    loadData.value = true;
    try {
        while (cocktails.length < 3) {
            const response = await fetchApi('https://www.thecocktaildb.com/api/json/v1/1/random.php');
            const cocktail = response.drinks[0];
            if (!ids.has(cocktail.idDrink)) {
                cocktails.push(cocktail);
                ids.add(cocktail.idDrink);
            }
        }
    } catch (error) {
        console.error('Error fetching cocktails:', error);
        errorMessage.value = 'An error occurred with the server while fetching cocktails.';
    } finally {
        randomCocktail.value = cocktails;
        loadData.value = false;
        loading.value = false;
    }
};

onMounted(fetchCocktails);
</script>

<template>
    <AppError v-if="errorMessage" :text="errorMessage" />
    <AppLoader v-if="loading" />
    <div v-else class="flex flex-col w-full h-full gap-4">
        <Header />
        <Main>
            <section class="flex flex-col justify-end h-full gap-4">
                <AppButton text="Fetch new cocktails" :isDisabled="loadData" @action="fetchCocktails">
                    <ph-circle-notch v-if="loadData" :size="32" weight="bold" color="#04d9ff" class="spinner" />
                    <ph-martini
                        v-else
                        :size="32"
                        weight="bold"
                        color="#04d9ff"
                        class="transition duration-300 group-hover:scale-110 group-hover:transform-shake"
                    />
                </AppButton>
                <ul
                    class="flex flex-col gap-4 mx-auto overflow-auto max-h-fit max-sm:h-[calc(100vh-124px)] lg:grid lg:grid-cols-3 md:gap-8 lg:gap-12 xl:gap-16 2xl:gap-32"
                >
                    <li v-for="cocktail in randomCocktail" :key="cocktail.idDrink" class="flex w-full group">
                        <AppCard :cocktail="cocktail" :loading="loading" :selectedCocktail="null" />
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
