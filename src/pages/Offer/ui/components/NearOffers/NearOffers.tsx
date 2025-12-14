import {useSelector} from 'react-redux';
import {changeOfferFavoriteStatus, RootState, useAppDispatch} from '@/shared/store';
import {FC} from 'react';
import {ClipLoader} from 'react-spinners';
import {OffersList} from '@/entities/Offer';

interface INearOffers {
  offerId: string;
}

const NearOffers: FC<INearOffers> = () => {

  const {nearOffers, isNearLoading} = useSelector((state: RootState) => state.offers);

  const dispatch = useAppDispatch();

  const handleChangeOfferFavoriteStatus = async (id: string, favorite: boolean) => {
    await dispatch(changeOfferFavoriteStatus({id, favorite}));
  };

  return (
    <div className="container">
      <section className="near-places places">
        <h2 className="near-places__title">Other places in the neighbourhood</h2>
        {isNearLoading
          ? <ClipLoader cssOverride={{margin: '0 auto'}} loading size={150}/>
          : (
            <div className="near-places__list places__list">
              <OffersList
                offers={nearOffers}
                changeFavoriteStatus={handleChangeOfferFavoriteStatus}
              />
            </div>
          )}
      </section>
    </div>
  );
};

export default NearOffers;
