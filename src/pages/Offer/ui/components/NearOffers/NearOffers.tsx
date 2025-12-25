import {FC, memo} from 'react';
import {OffersList} from '@/entities/Offer';
import {LoadingWrapper} from '@/shared/ui/LoadingWrapper';
import {TOffer} from '@/shared/model/offer';

interface INearOffers {
  offers: TOffer[];
  isLoading: boolean;
  changeOfferFavoriteStatus: (id: string, favorite: boolean) => Promise<void>;
  selectOffer?: (offer?: TOffer) => void;
}

const NearOffers: FC<INearOffers> = memo((props: INearOffers) => {

  const { changeOfferFavoriteStatus, offers, isLoading, selectOffer } = props;

  return (
    <div className="container">
      <section className="near-places places">
        <h2 className="near-places__title">Other places in the neighbourhood</h2>
        <LoadingWrapper isLoading={isLoading}>
          <div
            data-testid="offers-list"
            className="near-places__list places__list"
          >
            <OffersList
              offers={offers}
              changeFavoriteStatus={changeOfferFavoriteStatus}
              selectOffer={selectOffer}
            />
          </div>
        </LoadingWrapper>
      </section>
    </div>
  );
});

NearOffers.displayName = 'NearOffers';

export default NearOffers;
