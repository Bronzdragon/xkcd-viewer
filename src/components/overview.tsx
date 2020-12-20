import React from 'react';
import Thumbnail from './Thumbnail';

type OverviewProps = {
    onOpenComic?: (id: number) => void
    latestComic: number
}

const Overview: React.FC<OverviewProps> = ({onOpenComic, latestComic}) => {
    if(latestComic < 1){
        return <div>Loading latest comic...</div>
    }


    return <div onScroll={(event) => console.log("Scrolling!", event)}>
        Most recent comic: <span onClick={() => { if (onOpenComic) onOpenComic(latestComic) } }>{latestComic}</span>!
        <div>
            <Thumbnail onClick={() => { if (onOpenComic) onOpenComic(latestComic) } } comicId={latestComic} />
            <Thumbnail onClick={() => { if (onOpenComic) onOpenComic(latestComic-1) } } comicId={latestComic-1} />
            <Thumbnail onClick={() => { if (onOpenComic) onOpenComic(latestComic-2) } } comicId={latestComic-2} />
            <Thumbnail onClick={() => { if (onOpenComic) onOpenComic(latestComic-3) } } comicId={latestComic-3} />
        </div>
    </div>
}
export default Overview

