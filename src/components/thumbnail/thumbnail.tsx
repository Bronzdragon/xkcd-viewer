import React from 'react';
import { xkcdInfo } from '../../XKCDApiApi'
import cs from 'cs';

import styles from './thumbnail.module.css'

export type ThumbnailType = {
    comicInfo: xkcdInfo
    className?: string
    onClick?: (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => void
}

const Thumbnail: React.FC<ThumbnailType> = ({ comicInfo: { img: imgUrl, title }, className, onClick }) => {
    return <img onClick={onClick} src={imgUrl} alt={title} title={title} className={cs(styles.image, className)} />;
};

export default Thumbnail
