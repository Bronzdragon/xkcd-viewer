import React from 'react';
import { xkcdInfo } from '../XKCDApiApi'
import styles from './thumbnail.module.css'

export type ThumbnailType = {
    comicInfo: xkcdInfo
    className?: string
}

const Thumbnail: React.FC<ThumbnailType> = ({ comicInfo,  className = ''}) => {
    return <img src={comicInfo?.img} alt={comicInfo?.title} className={styles.image} />;
};

export default Thumbnail