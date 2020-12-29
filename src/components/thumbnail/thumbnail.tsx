import React from 'react';
import { xkcdInfo } from '../../XKCDApiApi'
import styles from './thumbnail.module.css'

export type ThumbnailType = {
    comicInfo: xkcdInfo
}

const Thumbnail: React.FC<ThumbnailType> = ({ comicInfo: { img: imgUrl, title} }) => {
    return <img src={imgUrl} alt={title} title={title} className={styles.image} />;
};

export default Thumbnail