import React, { useEffect, useState } from 'react';
import fetchComicInfo, { xkcdInfo } from '../../XKCDApiApi'

import Popover from '../popover/popover';
import ComicHeader from './header/header';
import ComicFooter from './footer/footer';

import styles from './detail_view.module.css'
import { addFavourite, isFavourite, removeFavourite } from '../../favourites';
import { ErrorQueue } from '../error-view/error-view';
import cs from 'cs';

const DetailView: React.FC<DetailViewProps> = ({ number, previousComic, nextComic, goBackHome, errorQueue }) => {
    const [comicInfo, setComicInfo] = useState<xkcdInfo | null>(null);
    // eslint-disable-next-line
    const [_, reRender] = useState(true);
    const favourite = isFavourite(number)
    useEffect(() => {
        // Get the info for this comic.
        fetchComicInfo(number).then(setComicInfo).catch((err: Error) => errorQueue.addItem(`Could not get information for this comic. [${err.message}]`))
    }, [number, errorQueue])

    useEffect(() => { // Allow keyboard navigation.
        const handler = (event: KeyboardEvent) => {
            if (event.key === "ArrowLeft" && previousComic) { previousComic() }
            if (event.key === "ArrowRight" && nextComic) { nextComic() }
            if (event.key === "Escape" && goBackHome) { goBackHome() }
        }
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [previousComic, nextComic, goBackHome])

    if (!comicInfo) {
        return <div>"... loading comic."</div>
    }

    return <Popover open={true} onDismiss={goBackHome} >
        <div className={styles.detailContainer}>
            <ComicHeader
                number={comicInfo.number}
                title={comicInfo.title}
                isFavourite={favourite}
                onToggleFavourite={() => {
                    (favourite ? removeFavourite : addFavourite)(number)
                    reRender(bool => !bool)
                }}
                className={styles.header}
            />
            <div className={styles.imgContainer}>
                <div className={cs(styles.left, styles.nav)} onClick={previousComic} ></div>
                <img className={styles.img} src={comicInfo.img} alt={comicInfo.title} title={comicInfo.alt} />
                <div className={cs(styles.right, styles.nav)} onClick={nextComic}></div>
            </div>
            <ComicFooter comicInfo={comicInfo} className={styles.footer} />
        </div>
    </Popover>
}

export default DetailView

type DetailViewProps = {
    number: number
    previousComic?: () => void
    nextComic?: () => void
    goBackHome?: () => void
    errorQueue: ErrorQueue
}