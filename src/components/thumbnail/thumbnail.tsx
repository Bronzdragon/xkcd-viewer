import React from 'react';
import { xkcdInfo } from '../../XKCDApiApi'
import cs from 'cs';

import styles from './thumbnail.module.css'

export type ThumbnailType = {
    comicInfo: xkcdInfo
    className?: string
}

const Thumbnail: React.FC<ThumbnailType> = ({ comicInfo: { img: imgUrl, title }, className }) => {
    return <img src={imgUrl} alt={title} title={title} className={cs(styles.image, className)} />;
};

export default Thumbnail
