import cs, { csType } from 'cs';
import Star from '../../star/star';
import styles from './header.module.css';

type ComicHeaderProps = {
    number: number
    title: string

    isFavourite?: boolean
    onToggleFavourite?: () => void

    className?: csType
};

export default function ComicHeader({ number, title, isFavourite = false, onToggleFavourite, className='' }: ComicHeaderProps) {
    return <span className={cs(className, styles.header)}>
        <span className={styles.number}>{number}</span>
        <span className={styles.title}>{title}</span>
        <Star onClick={onToggleFavourite} filled={isFavourite} className={styles.starButton} />
    </span>;
}
