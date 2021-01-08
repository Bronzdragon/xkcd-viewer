import full_star from './full_star.svg'
import empty_star from './empty_star.svg'
import styles from './star.module.css'
import cs, { csType } from 'cs'

type StarProps = {
    filled: boolean
    size?: number
    onClick?: (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => void
    className?: csType
}

const starEnumToPictureMap = new Map([
    [true, { src: full_star, description: "Full star" }],
    [false, { src: empty_star, description: "Empty star" }],
])

export default function Star({ filled, size = 20, onClick, className }: StarProps) {
    return <img
        className={cs(styles.star, className)}
        src={starEnumToPictureMap.get(filled)?.src}
        alt={starEnumToPictureMap.get(filled)?.description}
        width={size} height={size}
        onClick={onClick}
    />
}