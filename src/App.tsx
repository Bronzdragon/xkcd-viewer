import React, { useEffect, useState } from 'react';

import fetchComicInfo from './XKCDApiApi'
import Overview from './components/overview';
import DetailView from './components/detail_view';

function App() {
    const [mostRecentComic, setMostRecentComic] = useState(0);
    const [openComic, setOpenComic] = useState(0);
    // const [comicInfo, setComicInfo] = useState<xkcdInfo | null>(null);
    useEffect(() => {
        fetchComicInfo().then(result => setMostRecentComic(result.number))
    }, [])

    if(!openComic){
        return <div> You have no specific open comic.
            <Overview onOpenComic={setOpenComic} latestComic={mostRecentComic}></Overview>
        </div>
    } else {
        return <DetailView
            goBackHome={() => setOpenComic(0)}
            number={openComic}
            lastComic={mostRecentComic}
            nextComic={() => setOpenComic(num => num + 1)}
            previousComic={() => setOpenComic(num => Math.max(1, num - 1))}
        ></DetailView>
    }
}

export default App;
