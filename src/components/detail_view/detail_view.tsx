import React, { useEffect, useState } from 'react';
import fetchComicInfo, { xkcdInfo } from '../../XKCDApiApi'

import Popover from '../popover/popover';
import ComicHeader from './header/header';
import ComicFooter from './footer/footer';

import chevronLeft from './chevron-left.svg'
import chevronRight from './chevron-right.svg'
import styles from './detail_view.module.css'
import { addFavourite, isFavourite, removeFavourite } from '../../favourites';

type DetailViewProps = {
    number: number
    previousComic?: () => void
    nextComic?: () => void
    goBackHome?: () => void
}

const DetailView: React.FC<DetailViewProps> = ({ number, previousComic, nextComic, goBackHome }) => {
    const [comicInfo, setComicInfo] = useState<xkcdInfo | null>(null);
    const [favourite, setFavourite] = useState(isFavourite(number));
    useEffect(() => {
        // Get the info for this comic.
        fetchComicInfo(number).then(setComicInfo)
    }, [number])

    useEffect(() => {
        favourite ? addFavourite(number) : removeFavourite(number)
    }, [favourite, number])

    if (!comicInfo) {
        return <div>"... loading comic."</div>
    }

    return <Popover open={true} onDismiss={goBackHome} >
            <div className={styles.detailContainer}>
                <ComicHeader number={comicInfo.number} title={comicInfo.title} className={styles.header}/>
                <div className={styles.imgContainer}>
                    <div className={styles.left} onClick={previousComic} ></div>
                    <img className={styles.img} src={comicInfo.img} alt={comicInfo.title} title={comicInfo.alt} />
                    <div className={styles.right} onClick={nextComic}></div>
                </div>
                <ComicFooter comicId={comicInfo.number} isFavourite={favourite} onToggleFavourite={() => setFavourite(wasFavourite => !wasFavourite)} className={styles.footer} />
            
        </div>
    </Popover>
}

export default DetailView
