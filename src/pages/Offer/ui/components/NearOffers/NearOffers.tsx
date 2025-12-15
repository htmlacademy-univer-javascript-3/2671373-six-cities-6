import {useSelector} from 'react-redux';
import {changeOfferFavoriteStatus, getFavoriteOffersList, RootState, useAppDispatch} from '@/shared/store';
import {FC} from 'react';
import {OffersList} from '@/entities/Offer';
import {LoadingWrapper} from '@/shared/ui/LoadingWrapper';

interface INearOffers {
  offerId: string;
}

const NearOffers: FC<INearOffers> = () => {

  const {nearOffers, isNearLoading} = useSelector((state: RootState) => state.offers);

  const dispatch = useAppDispatch();

  const handleChangeOfferFavoriteStatus = async (id: string, favorite: boolean) => {
    await dispatch(changeOfferFavoriteStatus({id, favorite}));
    await dispatch(getFavoriteOffersList());
  };

  return (
    <div className="container">
      <section className="near-places places">
        <h2 className="near-places__title">Other places in the neighbourhood</h2>
        <LoadingWrapper isLoading={isNearLoading}>
          <div className="near-places__list places__list">
            <OffersList
              offers={nearOffers}
              changeFavoriteStatus={handleChangeOfferFavoriteStatus}
            />
          </div>
        </LoadingWrapper>
      </section>
    </div>
  );
};

export default NearOffers;
