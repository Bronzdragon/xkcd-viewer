import React, { useEffect, useState } from 'react';

import fetchComicInfo, { xkcdInfo } from './XKCDApiApi'
import Overview from './components/overview';
import DetailView from './components/detail_view';

function App() {
  const [openComic, setOpenComic] = useState<number>(0);
  const [comicInfo, setComicInfo] = useState<xkcdInfo|null>(null);
  useEffect(() => {
    fetchComicInfo().then(result => setComicInfo(result))
  }, [])

  return (
    <div className="App" onClick={() => setOpenComic((comic) => comic + 1)}>
      <h1>{comicInfo ? comicInfo.num : ''} – {comicInfo ? comicInfo.title : "Loading comic..."}</h1>
      {openComic > 0 ? <DetailView number={openComic}></DetailView> : <Overview></Overview>}
    </div>
  );
}

export default App;
