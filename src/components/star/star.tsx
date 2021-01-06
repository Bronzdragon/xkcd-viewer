import full_star from './full_star.svg'
import empty_star from './empty_star.svg'
import styles from './star.module.css'

type StarProps = {
    filled: boolean
    size?: number
    onClick?: (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => void
}

const starEnumToPictureMap = new Map([
    [true, { src: full_star, description: "Full star" }],
    [false, { src: empty_star, description: "Empty star" }],
])

export default function Star({ filled, size = 20, onClick }: StarProps) {
    return <img
        className={styles.star}
        src={starEnumToPictureMap.get(filled)?.src}
        alt={starEnumToPictureMap.get(filled)?.description}
        width={size} height={size}
        onClick={onClick}
    />
}