import React, { useEffect, useState } from 'react';
import fetchComicInfo, { xkcdInfo } from '../XKCDApiApi'


type DetailViewProps = {
    number: number
    previousComic?: () => void
    nextComic?: () => void
    lastComic: number
    goBackHome?: () => void
}

const getExplainLink = (id: number) => `https://explainxkcd.com/wiki/index.php/${id}`
const getSiteLink = (id: number) => `https://xkcd/com/${id}`

const DetailView: React.FC<DetailViewProps> = ({ number, lastComic, previousComic, nextComic, goBackHome }) => {
    const [comicInfo, setComicInfo] = useState<xkcdInfo | null>(null);
    useEffect(() => {
        // Get the info for this comic.
        fetchComicInfo(number).then(result => setComicInfo(result))
    }, [number])

    if (!comicInfo) {
        return <div>"... loading comic."</div>
    }

    return <div>
        <div onClick={() => { if (number >= 2 && previousComic) { previousComic() } }}>LEFT</div>
        Details on comic:
        {comicInfo.number} {comicInfo.title}!
        <img src={comicInfo.img} onClick={goBackHome} alt={comicInfo.title} title={comicInfo.alt} /> <br />
        <a href={getSiteLink(comicInfo.number)}>Source</a><a href={getExplainLink(comicInfo.number)}>Explaination</a>
        <div onClick={() => { if (number < lastComic && nextComic) { nextComic() } }}>RIGHT</div>
    </div>
}
export default DetailView