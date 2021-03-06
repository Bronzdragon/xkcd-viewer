import { useEffect, useState } from "react"
import { xkcdInfo } from '../../XKCDApiApi'
import Thumbnail from "../thumbnail/thumbnail"
import Throbber from "../throbber/throbber"

import styles from './preview.module.css'
import Star from "../star/star"
import { isFavourite, addFavourite, removeFavourite } from "../../favourites"

type PreviewType = {
    info: Promise<xkcdInfo>
    onOpenComic?: (id: number) => void
}

const Preview: React.FC<PreviewType> = ({ info: infoPromise, onOpenComic }) => {
    const [info, setInfo] = useState<xkcdInfo>()
    const [favourite, setFavourite] = useState(false)

    useEffect(() => {
        infoPromise.then(info => {
            setInfo(info)
            setFavourite(isFavourite(info.number))
        })
    }, [infoPromise])

    if (!info) {
        return <div className={styles.container + ' ' + styles.throbber}>
            <span className={styles.comicLabel} >loading...</span>
            <Throbber color="hsla(0, 0%, 0%, 0.2)" className={styles.thumbnail} />
        </div>
    }

    return <div className={styles.container} >
        <span className={styles.comicLabel} >
            {info.title}
            <Star filled={favourite} onClick={() => { (favourite ? removeFavourite : addFavourite)(info.number); setFavourite(!favourite) }} />
        </span>
        <Thumbnail className={styles.thumbnail} comicInfo={info} onClick={() => onOpenComic && onOpenComic(info.number)} />
    </div>
}

export default Preview
