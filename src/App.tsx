import React, { useEffect, useState } from 'react';

import fetchComicInfo, { preloadImage, xkcdInfo } from './XKCDApiApi'
import Overview from './components/overview';
import DetailView from './components/detail_view';

function App() {
    const [firstComic, setFirstComic] = useState<xkcdInfo|null>(null)
    const [latestComic, setLatestComic] = useState<xkcdInfo|null>(null)
    const [openComic, setOpenComic] = useState(0)
    useEffect(() => {
        fetchComicInfo().then(result => setLatestComic(result))
        fetchComicInfo(1).then(setFirstComic)
    }, [])

    // Preload the next/previous comic pages, if there are any.
    useEffect(() => {
        if (openComic < (latestComic?.number ?? 0)) { fetchComicInfo(openComic + 1).then(({ img }) => preloadImage(img)) }
        if (openComic > 1) { fetchComicInfo(openComic - 1).then(({ img }) => preloadImage(img)) }
    }, [openComic, latestComic])

    if (!latestComic || !firstComic) {
        // No comics loaded yet...
        return <div>...loading</div>
    }

    if (!openComic) {
        
        return <Overview />
    } else {
        return <DetailView
            goBackHome={() => setOpenComic(0)}
            number={openComic}
            nextComic={() => setOpenComic(num => Math.min(latestComic.number, num + 1))}
            previousComic={() => setOpenComic(num => Math.max(1, num - 1))}
        />
    }
}

export default App;
