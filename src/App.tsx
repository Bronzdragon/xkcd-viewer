import React, { useEffect, useState } from 'react';

import fetchComicInfo, { preloadImage } from './XKCDApiApi'
import Overview from './components/overview';
import DetailView from './components/detail_view';

function App() {
    const [mostRecentComic, setMostRecentComic] = useState(0);
    const [openComic, setOpenComic] = useState(0);
    useEffect(() => {
        fetchComicInfo().then(result => setMostRecentComic(result.number))
    }, [])

    // Preload the next/previous comic pages, if there are any.
    useEffect(() => {
        if (openComic < mostRecentComic) { fetchComicInfo(openComic + 1).then(({ img }) => preloadImage(img)) }
        if (openComic > 1) { fetchComicInfo(openComic - 1).then(({ img }) => preloadImage(img)) }
    }, [openComic, mostRecentComic])

    if (mostRecentComic === 0) {
        // No comics loaded yet...
        return <div>...loading</div>
    }

    if (!openComic) {
        return <Overview onOpenComic={setOpenComic} latestComic={mostRecentComic} />
    } else {
        return <DetailView
            goBackHome={() => setOpenComic(0)}
            number={openComic}
            lastComic={mostRecentComic}
            nextComic={() => setOpenComic(num => Math.min(mostRecentComic, num + 1))}
            previousComic={() => setOpenComic(num => Math.max(1, num - 1))}
        />
    }
}

export default App;
