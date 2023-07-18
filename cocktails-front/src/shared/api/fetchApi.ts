export async function fetchApi(url: string): Promise<any> {
    const response = await fetch(url);
    return response.json();
}