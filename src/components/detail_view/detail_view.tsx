import React, { useEffect, useState } from 'react';
import fetchComicInfo, { xkcdInfo } from '../../XKCDApiApi'

import Popover from '../popover/popover';
import ComicHeader from './header/header';
import ComicLinkSection from './link_section/link_section';

import styles from './detail_view.module.css'

type DetailViewProps = {
    number: number
    previousComic?: () => void
    nextComic?: () => void
    goBackHome?: () => void
}

const DetailView: React.FC<DetailViewProps> = ({ number, previousComic, nextComic, goBackHome }) => {
    const [comicInfo, setComicInfo] = useState<xkcdInfo | null>(null);
    useEffect(() => {
        // Get the info for this comic.
        fetchComicInfo(number).then(setComicInfo)
    }, [number])

    if (!comicInfo) {
        return <div>"... loading comic."</div>
    }

    return <Popover open={true} onDismiss={goBackHome} >
        <div className={styles.navigationContainer}>
            <div onClick={previousComic}>LEFT</div>
            <div className={styles.detailContainer}>
                <ComicHeader number={comicInfo.number} title={comicInfo.title} />
                <img src={comicInfo.img} alt={comicInfo.title} title={comicInfo.alt} />
                <ComicLinkSection comicId={comicInfo.number} />
            </div>
            <div onClick={nextComic}>RIGHT</div>
        </div>
    </Popover>
}

export default DetailView
