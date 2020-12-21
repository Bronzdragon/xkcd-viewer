import React, { useEffect, useState } from 'react';
import fetchComicInfo, { xkcdInfo } from '../XKCDApiApi'
import styles from './thumbnail.module.css'

type ThumbnailType = {
    comicId: number
    onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
    className?: string
}

const Thumbnail: React.FC<ThumbnailType> = ({ comicId, onClick, className = '' }) => {
    const [comicInfo, setComicInfo] = useState<xkcdInfo | null>(null);
    useEffect(() => {
        // Get the info for this comic.
        fetchComicInfo(comicId).then(result => setComicInfo(result))
    }, [comicId])
    
    return <div onClick={onClick} className={ className + ' ' + styles.container}>
        <img src={comicInfo?.img} alt={comicInfo?.title} className={styles.main} />
    </div>;
};

export default Thumbnail