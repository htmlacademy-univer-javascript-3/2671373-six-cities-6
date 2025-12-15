import {FC} from 'react';
import {OffersList} from '@/entities/Offer';
import {LoadingWrapper} from '@/shared/ui/LoadingWrapper';
import {TOffer} from '@/shared/model/offer';

interface INearOffers {
  offers: TOffer[];
  isLoading: boolean;
  changeOfferFavoriteStatus: (id: string, favorite: boolean) => Promise<void>;
}

const NearOffers: FC<INearOffers> = (props) => {

  const { changeOfferFavoriteStatus, offers, isLoading } = props;

  return (
    <div className="container">
      <section className="near-places places">
        <h2 className="near-places__title">Other places in the neighbourhood</h2>
        <LoadingWrapper isLoading={isLoading}>
          <div className="near-places__list places__list">
            <OffersList
              offers={offers}
              changeFavoriteStatus={changeOfferFavoriteStatus}
            />
          </div>
        </LoadingWrapper>
      </section>
    </div>
  );
};

export default NearOffers;
