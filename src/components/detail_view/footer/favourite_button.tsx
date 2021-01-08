import Star from '../../star/star';

export default function FavouriteButton({ isFavourite, onToggleFavourite, className='' }: FavouriteButtonType) {
    return <button className={className} onClick={onToggleFavourite} >
        <Star filled={isFavourite} />
    </button>;
}

type FavouriteButtonType = {
    isFavourite: boolean;
    onToggleFavourite?: () => void;
    className?: string
};
