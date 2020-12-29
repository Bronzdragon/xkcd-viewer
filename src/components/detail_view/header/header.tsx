import styles from './header.module.css';

type ComicHeaderProps = {
    number: number;
    title: string;
};

export default function ComicHeader({ number, title }: ComicHeaderProps) {
    return <span className={styles.header}>
        <span className={styles.number}>{number}</span>
        <span className={styles.title}>{title}</span>
    </span>;
}
