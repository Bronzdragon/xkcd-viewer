import React, { useEffect, useState } from 'react';
import fetchComicInfo, { xkcdInfo } from '../XKCDApiApi'


type ThumbnailType = {
    comicId: number
    onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

const Thumbnail: React.FC<ThumbnailType> = ({comicId, onClick}) => {
    const [comicInfo, setComicInfo] = useState<xkcdInfo|null>(null);
    useEffect(() => {
        // Get the info for this comic.
        fetchComicInfo(comicId).then(result => setComicInfo(result))
    }, [comicId])

    return <div style={{ width: 100, height: 100, border: "solid red" }} onClick={onClick}>
        <img style={{ width: 100, height: 100 }} src={comicInfo?.img} />
    </div>;
};

export default Thumbnail