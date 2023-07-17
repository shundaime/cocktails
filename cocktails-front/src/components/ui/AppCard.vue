<template>
    <transition name="fade" appear>
        <figure class="grid overflow-hidden relative w-full rounded-lg neon-no-blink">
            <img
                :src="cocktail.strDrinkThumb"
                :alt="cocktail.strDrink"
                @load="loading = false"
                class="object-cover w-full h-72 rounded-t-lg md:h-96"
            />
            <caption class="flex flex-col gap-4 justify-center p-4 w-full bg-violet-500 transition">
                <h2 class="z-10 font-bold">
                    {{ cocktail.strDrink }}
                </h2>
                <AppButtonVue
                    :text="selectedCocktail === cocktail ? 'Hide details' : 'Show details'"
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

<script>
export default {
    props: {
        cocktail: Object,
        selectedCocktail: Object,
    },
    methods: {
        toggleDetails() {
            this.$emit('toggleDetails', this.cocktail);
        },
        getIngredientsAndMeasures() {
            return {
                ingredients: [],
                measures: [],
            };
        },
    },
};
</script>
