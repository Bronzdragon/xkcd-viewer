
const key = 'xkcd-favourites' as const
const favourites: number[] = JSON.parse(localStorage.getItem(key) ?? "[]")

export default function getFavourites() {
    return [...favourites];
}

export function addFavourite(id: number) {
    if (favourites.includes(id)) { return }
    favourites.push(id)
    localStorage.setItem(key, JSON.stringify(favourites))
}

export function removeFavourite(id: number) {
    const index = favourites.findIndex(val => val === id)
    if (index === -1) { return }

    favourites.splice(index, 1)
    localStorage.setItem(key, JSON.stringify(favourites))
}