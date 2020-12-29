import React, { useEffect, useState } from 'react';
import fetchComicInfo, { xkcdInfo } from '../../XKCDApiApi'
import styles from './detail_view.module.css'


type DetailViewProps = {
    number: number
    previousComic?: () => void
    nextComic?: () => void
    goBackHome?: () => void
}

const getExplainLink = (id: number) => `https://explainxkcd.com/wiki/index.php/${id}`
const getSiteLink = (id: number) => `https://xkcd/com/${id}`

const DetailView: React.FC<DetailViewProps> = ({ number, previousComic, nextComic, goBackHome }) => {
    const [comicInfo, setComicInfo] = useState<xkcdInfo | null>(null);
    useEffect(() => {
        // Get the info for this comic.
        fetchComicInfo(number).then(result => setComicInfo(result))
    }, [number])

    if (!comicInfo) {
        return <div>"... loading comic."</div>
    }

    return <div className={styles.background} onClick={goBackHome} >
        <div className={styles.navigationContainer} onClick={event => event.stopPropagation()}>
            <div onClick={previousComic}>LEFT</div>
            <div className={styles.detailContainer}>
                <span className={styles.header}>
                    <span className={styles.number}>{comicInfo.number}</span>
                    <span className={styles.title}>{comicInfo.title}</span>
                </span>
                <img src={comicInfo.img} onClick={goBackHome} alt={comicInfo.title} title={comicInfo.alt} />
                <div className={styles.links}>
                    <a href={getSiteLink(comicInfo.number)}>Source</a>
                    <a href={getExplainLink(comicInfo.number)}>Explaination</a>
                </div>
            </div>
            <div onClick={nextComic}>RIGHT</div>
        </div>
    </div>
}
export default DetailView