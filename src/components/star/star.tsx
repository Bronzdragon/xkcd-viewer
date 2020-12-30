import full_star from './full_star.svg'
import half_star from './half_star.svg'
import empty_star from './empty_star.svg'
import styles from './star.module.css'

export enum StarType {
    Full, Half, Empty
}

type StarProps = {
    type: StarType
    size?: number
}

const starEnumToPictureMap = new Map([
    [StarType.Full, { src: full_star, description: "Full star" }],
    [StarType.Half, { src: half_star, description: "Half star" }],
    [StarType.Empty, { src: empty_star, description: "Empty star" }],
])

export default function Star({ type, size = 20 }: StarProps) {
    return <img
        className={styles.star}
        src={starEnumToPictureMap.get(type)?.src}
        alt={starEnumToPictureMap.get(type)?.description}
        width={size} height={size}
    />
}