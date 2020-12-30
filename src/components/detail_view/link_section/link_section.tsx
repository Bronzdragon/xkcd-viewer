import styles from './link_section.module.css';

type ComicLinkSectionProps = {
    comicId: number;
}

export default function ComicLinkSection({ comicId }: ComicLinkSectionProps) {
    return <div className={styles.links}>
        <a href={getSiteLink(comicId)}>Source</a>
        <a href={getExplainLink(comicId)}>Explaination</a>
    </div>
}

const getSiteLink = (id: number) => `https://xkcd/com/${id}`
const getExplainLink = (id: number) => `https://explainxkcd.com/wiki/index.php/${id}`
