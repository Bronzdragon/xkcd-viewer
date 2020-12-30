import { useState } from 'react';
import Star, { StarType } from '../../star/star';

export default function FavouriteButton({ isFavourite, onToggleFavourite }: FavouriteButtonType) {
    const [isHovering, setIsHovering] = useState(false);
    const starState = isHovering ? StarType.Half : isFavourite ? StarType.Full : StarType.Empty;

    return <button
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={() => {
            onToggleFavourite && onToggleFavourite();
            setIsHovering(false); // Dumb hack to get the button to change.
        }}>
        Set favourite <Star type={starState} />
    </button>;
}
type FavouriteButtonType = {
    isFavourite: boolean;
    onToggleFavourite?: () => void;
};
