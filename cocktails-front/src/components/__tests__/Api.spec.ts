import { test, expect, vi } from 'vitest';
import { fetchApi } from '../../shared/api/fetchApi';

global.fetch = vi.fn();

function createFetchResponse(data: object) {
    return { json: () => Promise.resolve(data) };
}

test('makes a GET request to fetch cocktail list and returns the result', async () => {
    const cocktailResponse = [
        {
            title: 'Unit test',
        },
    ];

    fetch.mockResolvedValue(createFetchResponse(cocktailResponse));

    const todoList = await fetchApi('https://www.thecocktaildb.com/api/json/v1/1/random.php');

    expect(todoList).toStrictEqual(cocktailResponse);
});
