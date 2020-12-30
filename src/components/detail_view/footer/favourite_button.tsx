import Star from '../../star/star';

export default function FavouriteButton({ isFavourite, onToggleFavourite }: FavouriteButtonType) {
    return <button
        onClick={onToggleFavourite}>
        Set favourite <Star filled={isFavourite} />
    </button>;
}
type FavouriteButtonType = {
    isFavourite: boolean;
    onToggleFavourite?: () => void;
};
