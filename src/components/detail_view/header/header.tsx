import cs, { csType } from 'cs';
import styles from './header.module.css';

type ComicHeaderProps = {
    number: number
    title: string
    className?: csType
};

export default function ComicHeader({ number, title, className='' }: ComicHeaderProps) {
    return <span className={cs(className)}>
        <span className={styles.number}>{number}</span>
        <span className={styles.title}>{title}</span>
    </span>;
}
