import React, { useEffect, useState } from 'react'
import Preview from './preview/preview'
import styles from './overview.module.css'
import Navigator from './navigator/navigator'

type OverviewProps = {
    onOpenComic: (id: number) => void
    latestComic: number
}

const distanceFromBottom = () => document.body.scrollHeight - (window.pageYOffset + document.documentElement.clientHeight)

const generateThumbnails = (num: number, index: number, onOpenComic: (id: number) => void, ascending = false) => {
    const incrementer = ascending ? 1 : -1
    const newPreviews: JSX.Element[] = []

    for (let i = index; i > index + (num * incrementer); i += incrementer) {
        newPreviews.push(<Preview key={i} onClick={() => onOpenComic(i)} comicId={i} />,)
    }

    return newPreviews
}

const Overview: React.FC<OverviewProps> = ({ onOpenComic, latestComic }) => {
    const [previews, setPreviews] = useState<JSX.Element[]>([])

    useEffect(() => {
        const scrollHandler = () => {
            if(distanceFromBottom() < 400) {
                setPreviews(previews => [...previews, ...generateThumbnails(5, latestComic - previews.length, onOpenComic)])
            }
        }
        document.addEventListener("scroll", scrollHandler )
        return () => document.removeEventListener("scroll", scrollHandler)
    })

    useEffect(() => {
        if(distanceFromBottom() < 400) {
            setPreviews(previews => [...previews, ...generateThumbnails(3, latestComic - previews.length, onOpenComic)])
        }
    }, [previews, latestComic, onOpenComic])

    return <div>
        Most recent comic: {latestComic}!
        <div className={styles.container}>
            {previews}
        </div>
        <Navigator setMonth={month => console.log(month)} viewFavourites={() => console.log("Here are your favourites: Strawberry icecream")} />
    </div>
}

export default Overview