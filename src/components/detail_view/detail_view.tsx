import React, { useEffect, useState } from 'react';
import fetchComicInfo, { xkcdInfo } from '../../XKCDApiApi'
import styles from './detail_view.module.css'
import { Popover } from '../popover/popover';
import { ComicHeader } from './comic_header';
import ComicLinkSection from './comic_linksection/link_section';

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
        fetchComicInfo(number).then(setComicInfo)
    }, [number])

    if (!comicInfo) {
        return <div>"... loading comic."</div>
    }

    return <Popover open={true} onClose={goBackHome} >
        <div className={styles.navigationContainer} onClick={event => event.stopPropagation()}>
            <div onClick={previousComic}>LEFT</div>
            <div className={styles.detailContainer}>
                <ComicHeader number={comicInfo.number} title={comicInfo.title} />
                <img src={comicInfo.img} onClick={goBackHome} alt={comicInfo.title} title={comicInfo.alt} />
                <ComicLinkSection comicId={comicInfo.number} />
            </div>
            <div onClick={nextComic}>RIGHT</div>
        </div>
    </Popover>
}

export default DetailView
