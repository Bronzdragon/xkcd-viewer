import { useEffect, useState } from "react"
import { xkcdInfo } from '../../XKCDApiApi'
import Thumbnail from "../thumbnail/thumbnail"
import Throbber from "../throbber/throbber"

import styles from './preview.module.css'
import Star from "../star/star"
import { isFavourite } from "../../favourites"

type PreviewType = {
    info: Promise<xkcdInfo>
    onOpenComic?: (id: number) => void
}

const Preview: React.FC<PreviewType> = ({ info: infoPromise, onOpenComic }) => {
    const [info, setInfo] = useState<xkcdInfo>()

    useEffect(() => {
        infoPromise.then(info => setInfo(info))
    }, [])

    if (!info) {
        return <div className={styles.container + ' ' + styles.throbber}>
            <Throbber color="hsla(0, 0%, 0%, 0.2)" />
            loading...
        </div>
    }

    return <div className={styles.container} onClick={() => onOpenComic && onOpenComic(info.number)}>
        <span>{info.title} <Star filled={isFavourite(info.number)} /></span>
        <Thumbnail className={styles.thumbnail} comicInfo={info} />
    </div>
}

export default Preview
