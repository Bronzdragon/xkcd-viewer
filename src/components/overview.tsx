import React, { useEffect, useState } from 'react';
import fetchComicInfo, { xkcdInfo } from '../XKCDApiApi'

type OverviewProps = {
    onOpenComic?: (id: number) => void
    latestComic: number
}

const Overview: React.FC<OverviewProps> = ({onOpenComic, latestComic}) => {
    return <div onScroll={(event) => console.log("Scrolling!")}>Last comic: <a onClick={() => { if (onOpenComic) onOpenComic(latestComic) } }>{latestComic}</a>!</div>
}
export default Overview