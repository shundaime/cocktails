<template>
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

<script setup lang="ts">
const props = defineProps<{ cocktail: Object; selectedCocktail: Object }>();
const emit = defineEmits<{
    (e: 'toggleDetails', cocktail: Object): void;
}>();

function toggleDetails() {
    emit('toggleDetails', props.cocktail);
}

function getIngredientsAndMeasures() {
    return {
        ingredients: [],
        measures: [],
    };
}
</script>
