import React from 'react';
import { xkcdInfo } from '../XKCDApiApi'
import styles from './thumbnail.module.css'

export type ThumbnailType = {
    comicInfo: xkcdInfo
}

const Thumbnail: React.FC<ThumbnailType> = ({ comicInfo }) => {
    return <img src={comicInfo?.img} alt={comicInfo?.title} className={styles.image} />;
};

export default Thumbnail