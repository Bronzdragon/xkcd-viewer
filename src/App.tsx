import React, { useEffect, useState } from 'react';

import fetchComicInfo, { preloadImage, xkcdInfo } from './XKCDApiApi'
import Overview from './components/overview';
import DetailView from './components/detail_view/detail_view';

function App() {
    const [latestComic, setLatestComic] = useState<number>(0)
    const [openComic, setOpenComic] = useState(0)
    useEffect(() => {
        fetchComicInfo().then(({number}) => setLatestComic(number))
    }, [])

    // Preload the next/previous comic pages, if there are any.
    useEffect(() => {
        if (openComic + 1 <= latestComic) { fetchComicInfo(openComic + 1).then(({ img }) => preloadImage(img)) }
        if (openComic - 1 >= 1) { fetchComicInfo(openComic - 1).then(({ img }) => preloadImage(img)) }
    }, [openComic, latestComic])

    if (!latestComic) {
        // No comics loaded yet...
        return <div>...loading</div>
    }

    return <>
        <Overview onOpenComic={setOpenComic} />
        {openComic > 0 && <DetailView
            goBackHome={() => setOpenComic(0)}
            number={openComic}
            nextComic={() => setOpenComic(num => Math.min(latestComic, num + 1))}
            previousComic={() => setOpenComic(num => Math.max(1, num - 1))}
        />}
    </>
}

export default App;
