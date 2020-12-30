import React, { useEffect, useState } from 'react';
import fetchComicInfo, { xkcdInfo } from '../../XKCDApiApi'

import Popover from '../popover/popover';
import ComicHeader from './header/header';
import ComicFooter from './footer/footer';

import styles from './detail_view.module.css'
import getFavourites, { addFavourite } from '../../favourites';

type DetailViewProps = {
    number: number
    previousComic?: () => void
    nextComic?: () => void
    goBackHome?: () => void
}

const DetailView: React.FC<DetailViewProps> = ({ number, previousComic, nextComic, goBackHome }) => {
    const [comicInfo, setComicInfo] = useState<xkcdInfo | null>(null);
    const [isFavourite, setFavourite] = useState(getFavourites().includes(number));
    useEffect(() => {
        // Get the info for this comic.
        fetchComicInfo(number).then(setComicInfo)
    }, [number])

    useEffect(() => {
        addFavourite(number)
    }, [isFavourite, number])

    if (!comicInfo) {
        return <div>"... loading comic."</div>
    }

    return <Popover open={true} onDismiss={goBackHome} >
        <div className={styles.navigationContainer}>
            <div onClick={previousComic}>LEFT</div>
            <div className={styles.detailContainer}>
                <ComicHeader number={comicInfo.number} title={comicInfo.title} />
                <img src={comicInfo.img} alt={comicInfo.title} title={comicInfo.alt} />
                <ComicFooter comicId={comicInfo.number} isFavourite={isFavourite} onToggleFavourite={() => setFavourite(wasFavourite => !wasFavourite)} />
            </div>
            <div onClick={nextComic}>RIGHT</div>
        </div>
    </Popover>
}

export default DetailView
