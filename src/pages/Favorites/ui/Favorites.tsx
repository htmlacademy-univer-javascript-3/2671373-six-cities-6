import {FC, useCallback, useEffect} from 'react';
import {OffersList} from '@/entities/Offer';
import {changeOfferFavoriteStatus, getFavoriteOffersList} from '@/shared/store';
import {useSelector} from 'react-redux';
import {LoadingWrapper} from '@/shared/ui/LoadingWrapper';
import classNames from 'classnames';
import {useAppDispatch} from '@/shared/hooks';
import {State} from '@/shared/types';

const FavoritesPage: FC = () => {

  const dispatch = useAppDispatch();
  const {favorites, isLoading} = useSelector((state: State) => state.favorites);

  useEffect(() => {
    dispatch(getFavoriteOffersList());
  }, [dispatch]);

  const handleChangeOfferFavoriteStatus = useCallback(async (id: string, favorite: boolean) => {
    await dispatch(changeOfferFavoriteStatus({id, favorite}));
    await dispatch(getFavoriteOffersList());
  }, [dispatch]);

  const isPageEmpty = Object.values(favorites).length === 0;

  return (
    <div className={classNames('page', isPageEmpty && 'page--favorites-empty')}>

      <main className={classNames('page__main page__main--favorites', isPageEmpty && 'page__main--favorites-empty')}>
        <div className="page__favorites-container container">
          <section className={classNames('favorites', isPageEmpty && 'favorites--empty')}>
            <h1 className="favorites__title">Saved listing</h1>
            <LoadingWrapper isLoading={isLoading}>
              {isPageEmpty ? (
                <div className="favorites__status-wrapper">
                  <b className="favorites__status">Nothing yet saved.</b>
                  <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
                </div>
              ) : (
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
              )}
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
