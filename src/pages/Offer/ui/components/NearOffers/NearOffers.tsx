import {useSelector} from 'react-redux';
import {RootState} from '@/shared/store';
import {FC} from 'react';
import {ClipLoader} from 'react-spinners';
import {Rating} from '@/shared/ui/Rating';
import * as classNames from 'classnames';

interface INearOffers {
  offerId: string;
}

const NearOffers: FC<INearOffers> = () => {

  const {nearOffers, isNearLoading} = useSelector((state: RootState) => state.offers);

  return (
    <div className="container">
      <section className="near-places places">
        <h2 className="near-places__title">Other places in the neighbourhood</h2>
        {isNearLoading
          ? <ClipLoader cssOverride={{margin: '0 auto'}} loading size={150}/>
          : (
            <div className="near-places__list places__list">
              {nearOffers.map((offer) => (
                <article className="near-places__card place-card" key={offer.id}>
                  <div className="near-places__image-wrapper place-card__image-wrapper">
                    <a href="#">
                      <img
                        className="place-card__image"
                        src={offer.previewImage}
                        width="260"
                        height="200"
                        alt="Place image"
                      />
                    </a>
                  </div>
                  <div className="place-card__info">
                    <div className="place-card__price-wrapper">
                      <div className="place-card__price">
                        <b className="place-card__price-value">&euro;{offer.price}</b>
                        <span className="place-card__price-text">&#47;&nbsp;night</span>
                      </div>
                      <button
                        className={classNames(
                          'place-card__bookmark-button',
                          offer.isFavorite && 'place-card__bookmark-button--active',
                          'button'
                        )}
                        type="button"
                      >
                        <svg className="place-card__bookmark-icon" width="18" height="19">
                          <use xlinkHref="#icon-bookmark"></use>
                        </svg>
                        <span className="visually-hidden">{offer.isFavorite ? 'In' : 'To'} bookmarks</span>
                      </button>
                    </div>
                    <Rating rating={offer.rating}/>
                    <h2 className="place-card__name">
                      <a href="#">{offer.title}</a>
                    </h2>
                    <p className="place-card__type">{offer.type}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
      </section>
    </div>
  );
};

export default NearOffers;
