import { promises } from 'dns';
import fetch from 'node-fetch';

const getUrl = (comicId?: number) => `https://cors-anywhere.herokuapp.com/https://xkcd.com/${comicId ? `${comicId}/` : ''}info.0.json`


export type xkcdInfo = {
    num: number,

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
    const {year, month, day, ...rest} = obj

    return {
        date: new Date(Number(year), Number(month) - 1, Number(day)),
        ...rest
    }
}

const getPageInfo = async (comicId?: number): Promise<xkcdInfo> => {
    const url = getUrl(comicId)
    const storedData = localStorage.getItem(url)
    if (storedData) {
        return jsonToXKCD(storedData)
    }

    const response = await fetch(getUrl(comicId))

    if (!response.ok) {
        throw new Error("Comic info could not be gotten." +  response.statusText)
    }

    const result = await response.text()
    localStorage.setItem(url, result)

    return jsonToXKCD(result)
}
export default getPageInfo

export const preloadImage = (url: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.addEventListener('load', () => resolve())
        img.addEventListener('error', ({message}) => reject(message))

        img.src = url
    })
}