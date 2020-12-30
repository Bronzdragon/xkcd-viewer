import { useEffect, useState } from "react"
import fetchComicInfo, { xkcdInfo } from '../../XKCDApiApi'
import Thumbnail from "../thumbnail/thumbnail"
import Throbber from "../throbber/throbber"

import styles from './preview.module.css'
import Star from "../star/star"
import { isFavourite } from "../../favourites"

type PreviewType = {
    comicId: number
    onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

const Preview: React.FC<PreviewType> = ({ comicId, onClick }) => {
    const [comicInfo, setComicInfo] = useState<xkcdInfo | null>(null)
    useEffect(() => {
        // Get the info for this comic.
        fetchComicInfo(comicId).then(setComicInfo)
        // setComicInfo(null);
    }, [comicId])

    if (!comicInfo) {
        return <div className={styles.container + ' ' + styles.throbber}>
            <Throbber color="hsla(0, 0%, 0%, 0.2)" />
            loading...
        </div>
    }

    return <div className={styles.container} onClick={onClick}>
        <span>{comicInfo.title} <Star filled={isFavourite(comicInfo.number)} /></span>
        <Thumbnail className={styles.thumbnail} comicInfo={comicInfo} />
    </div>
}

export default Preview
