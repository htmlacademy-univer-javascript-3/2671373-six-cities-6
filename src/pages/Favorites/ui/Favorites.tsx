import {FC, useEffect} from 'react';
import {OffersList} from '@/entities/Offer';
import {changeOfferFavoriteStatus, getFavoriteOffersList, RootState, useAppDispatch} from '@/shared/store';
import {useSelector} from 'react-redux';
import {LoadingWrapper} from '@/shared/ui/LoadingWrapper';

const FavoritesPage: FC = () => {

  const dispatch = useAppDispatch();
  const {favorites, isLoading} = useSelector((state: RootState) => state.favorites);

  useEffect(() => {
    dispatch(getFavoriteOffersList());
  }, [dispatch]);

  const handleChangeOfferFavoriteStatus = async (id: string, favorite: boolean) => {
    await dispatch(changeOfferFavoriteStatus({id, favorite}));
    await dispatch(getFavoriteOffersList());
  };

  return (
    <div className="page">

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <LoadingWrapper isLoading={isLoading}>
              <ul className="favorites__list">
                {Object.entries(favorites).map(([city, offers]) => (
                  <li className="favorites__locations-items" key={city}>
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <a className="locations__item-link" href="#">
                          <span>{city}</span>
                        </a>
                      </div>
                    </div>
                    <div className="cities__places-list places__list tabs__content">
                      <OffersList
                        offers={offers}
                        changeFavoriteStatus={handleChangeOfferFavoriteStatus}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </LoadingWrapper>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </a>
      </footer>
    </div>
  );
};

export default FavoritesPage;
