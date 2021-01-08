import cs, { csType } from 'cs';
import FavouriteButton from './favourite_button';
import styles from './footer.module.css';

type ComicFooterType = {
    comicId: number
    isFavourite?: boolean
    onToggleFavourite?: () => void
    className?: csType
}

export default function ComicFooter({ comicId, isFavourite, onToggleFavourite, className='' }: ComicFooterType) {
    return <div className={cs(styles.links, className)}>
        <a href={getSiteLink(comicId)}>Source</a>
        <FavouriteButton className={styles.favourite} isFavourite={Boolean(isFavourite)} onToggleFavourite={onToggleFavourite} />
        <a href={getExplainLink(comicId)}>Explaination</a>
    </div>
}

const getSiteLink = (id: number) => `https://xkcd/com/${id}`
const getExplainLink = (id: number) => `https://explainxkcd.com/wiki/index.php/${id}`
