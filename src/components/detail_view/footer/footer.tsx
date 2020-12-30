import FavouriteButton from './favourite_button';
import styles from './footer.module.css';

type ComicFooterType = {
    comicId: number;
    isFavourite?: boolean
    onToggleFavourite?: () => void
}

export default function ComicFooter({ comicId, isFavourite, onToggleFavourite }: ComicFooterType) {
    return <div className={styles.links}>
        <a href={getSiteLink(comicId)}>Source</a>
        <FavouriteButton isFavourite={isFavourite ?? false} onToggleFavourite={onToggleFavourite} />
        <a href={getExplainLink(comicId)}>Explaination</a>
    </div>
}

const getSiteLink = (id: number) => `https://xkcd/com/${id}`
const getExplainLink = (id: number) => `https://explainxkcd.com/wiki/index.php/${id}`
