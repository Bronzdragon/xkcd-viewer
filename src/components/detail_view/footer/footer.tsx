import cs, { csType } from 'cs';
import { xkcdInfo } from '../../../XKCDApiApi';
import styles from './footer.module.css';

type ComicFooterType = {
    comicInfo: xkcdInfo
    className?: csType
}

export default function ComicFooter({ comicInfo, className='' }: ComicFooterType) {
    return <><div className={cs(styles.links, className)}>
        <a href={getSiteLink(comicInfo.number)} target="blank_" rel="noopener noreferrer" >Source</a>
        <a href={getExplainLink(comicInfo.number)} target="blank_" rel="noopener noreferrer" >Explaination</a>
    </div>
    <blockquote className={styles.altContainer}>{comicInfo.alt}</blockquote>
    </>
}

const getSiteLink = (id: number) => `https://xkcd/com/${id}`
const getExplainLink = (id: number) => `https://explainxkcd.com/wiki/index.php/${id}`
