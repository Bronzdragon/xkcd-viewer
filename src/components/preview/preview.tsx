import { useEffect, useState } from "react"
import fetchComicInfo, { xkcdInfo } from '../../XKCDApiApi'
import Thumbnail from "../thumbnail/thumbnail"
import Throbber from "../throbber/throbber"

import styles from './preview.module.css'

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
        <Thumbnail comicInfo={comicInfo} />
        {comicInfo.title}
    </div>
}

export default Preview
