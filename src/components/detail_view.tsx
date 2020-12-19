import React, {useEffect, useState, VoidFunctionComponent} from 'react';
import fetchComicInfo, { xkcdInfo, preloadImage } from '../XKCDApiApi'


type DetailViewProps = {
    number: number
    previousComic?: () => void
    nextComic?: () => void
    lastComic: number
    goBackHome?: () => void
}

const getExplainLink = (id: number) => `https://explainxkcd.com/wiki/index.php/${id}`
const getSiteLink    = (id: number) => `https://xkcd/com/${id}`

const DetailView: React.FC<DetailViewProps> = ({ number, lastComic, previousComic, nextComic, goBackHome }) => {
    const [comicInfo, setComicInfo] = useState<xkcdInfo | null>(null);
    useEffect(() => {
        // Get the info for this comic.
        fetchComicInfo(number).then(result => setComicInfo(result))
    }, [number])

    useEffect(() => {
        // pre-load the previous and next comics.
        if (!comicInfo) return;
        if(comicInfo.number < lastComic) { fetchComicInfo(comicInfo.number + 1).then(({img}) => preloadImage(img)) }
        if(comicInfo.number >= 2) { fetchComicInfo(comicInfo.number - 1).then(({img}) => preloadImage(img)) }
    }, [comicInfo])

    if (!comicInfo) {
        return <div>"... loading comic."</div>
    }

    return <div>
        <div onClick={() => { if (number >= 2 && previousComic) { previousComic() } }}>LEFT</div>
        Details on comic:
        {comicInfo.number} {comicInfo.title}!
        <img src={comicInfo.img} onClick={goBackHome}></img> <br />
        <a href={getSiteLink(comicInfo.number)}>Source</a><a href={getExplainLink(comicInfo.number)}>Explaination</a>
        <div onClick={() => { if(number < lastComic && nextComic) { nextComic() } }}>RIGHT</div>
    </div>
}
export default DetailView