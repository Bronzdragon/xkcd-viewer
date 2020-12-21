import fetch from 'node-fetch';

const getUrl = (comicId?: number) => `https://cors-anywhere.herokuapp.com/https://xkcd.com/${comicId ? `${comicId}/` : ''}info.0.json`


export type xkcdInfo = {
    number: number,

    date: Date,

    img: string,
    safe_title: string,
    title: string,
    alt: string,
    link: string,
    news: string,
    transcript: string,
}

const jsonToXKCD = (json: string): xkcdInfo => {
    const obj = JSON.parse(json);
    const { year, month, day, num, ...rest } = obj

    return {
        date: new Date(Number(year), Number(month) - 1, Number(day)),
        number: num,
        ...rest,
    }
}

const getPageInfo = async (comicId?: number, preload = false): Promise<xkcdInfo> => {
    if (comicId !== undefined && comicId <= 0) {
        throw new Error(`Cannot get comic with id ${comicId}.`)
    }

    const url = getUrl(comicId)
    const storedData = localStorage.getItem(url)
    if (storedData) {
        return jsonToXKCD(storedData)
    }

    const response = await fetch(url)

    if (!response.ok) {
        console.error("Could get comic ", url)
        throw new Error("Comic info could not be gotten. " + response.statusText)
    }

    const result = await response.text()
    localStorage.setItem(url, result)

    const xkcdInfo = jsonToXKCD(result);

    if (preload) {
        preloadImage(xkcdInfo.img)
    }

    return xkcdInfo
}
export default getPageInfo

export const preloadImage = (url: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.addEventListener('load', () => resolve())
        img.addEventListener('error', ({ message }) => reject(message))

        img.src = url
    })
}