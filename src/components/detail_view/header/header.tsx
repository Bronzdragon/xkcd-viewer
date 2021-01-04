import cs from 'cs';
import styles from './header.module.css';

type ComicHeaderProps = {
    number: number
    title: string
    className?: string
};

export default function ComicHeader({ number, title, className='' }: ComicHeaderProps) {
    return <span className={cs(styles.header, className)}>
        <span className={styles.number}>{number}</span>
        <span className={styles.title}>{title}</span>
    </span>;
}
