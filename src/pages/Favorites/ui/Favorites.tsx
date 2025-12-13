import {FC, useEffect} from 'react';
import {OffersList} from '@/entities/Offer';
import {getFavoriteOffersList, RootState, useAppDispatch} from '@/shared/store';
import {useSelector} from 'react-redux';
import {ClipLoader} from 'react-spinners';

const FavoritesPage: FC = () => {

  const dispatch = useAppDispatch();
  const {favorites, isLoading} = useSelector((state: RootState) => state.offers);

  useEffect(() => {
    dispatch(getFavoriteOffersList());
  }, [dispatch]);

  return (
    <div className="page">

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            {isLoading
              ? <ClipLoader cssOverride={{margin: '0 auto'}} loading size={150}/>
              : (
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
                      <OffersList offers={offers}/>
                    </li>
                  ))}
                </ul>
              )}
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
