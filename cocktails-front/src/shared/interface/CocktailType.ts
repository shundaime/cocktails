export interface CocktailType {
    idDrink?: string;
    strDrink?: string;
    strDrinkThumb?: string;
    strInstructions?: string;
    strIngredient?: string;
    strMeasure?: string;
    [key: string]: string | undefined;
}
