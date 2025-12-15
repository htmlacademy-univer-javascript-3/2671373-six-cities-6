import {FC, memo, useState} from 'react';
import {IOfferCard} from './OfferCard.type';
import {Link} from 'react-router-dom';
import {BookmarkButton} from '@/shared/ui/BookmarkButton';
import {Rating} from '@/shared/ui/Rating';

const OfferCard: FC<IOfferCard> = memo((props: IOfferCard) => {

  const { offer, changeFavoriteStatus, selectOffer } = props;
  const [isFavorite, setFavorite] = useState(offer.isFavorite);

  const handleChangeFavorite = () => {
    changeFavoriteStatus(offer.id, !isFavorite).then(() => {
      setFavorite(!isFavorite);
    });
  };

  return (
    <article
      className="cities__card place-card" id={offer.id}
      onMouseEnter={() => selectOffer?.(offer)}
      onMouseLeave={() => selectOffer?.(undefined)}
    >
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt="Place image"/>
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <BookmarkButton active={isFavorite} onClick={handleChangeFavorite}/>
        </div>
        <Rating rating={offer.rating} />
        <h2 className="place-card__name">
          <Link to={`/offer/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
});

OfferCard.displayName = 'OfferCard';

export default OfferCard;
