import {OffersList} from '@/entities/Offer';
import {locations, locationsCoords, pointsMock, selectedPointMock} from '@/shared/mocks';
import {FC, useEffect, useState} from 'react';
import {Map} from '@/widgets/Map/ui';
import {LocationsList} from './components/LocationsList';
import {useSearchParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {getOffersListByLocation, RootState, useAppDispatch} from '@/shared/store';

const MainPage: FC = () => {

  const [searchParams] = useSearchParams();

  const dispatch = useAppDispatch();
  const { offers } = useSelector((state: RootState) => state.offers);

  const [activeLocation, setActiveLocation] = useState(searchParams.get('location') || locations[0]);
  const [points] = useState(pointsMock);
  const [selectedPoint] = useState(selectedPointMock);

  useEffect(() => {
    const location = searchParams.get('location');
    if (location) {
      setActiveLocation(location);
    }
  }, [searchParams]);

  useEffect(() => {
    dispatch(getOffersListByLocation(activeLocation));
  }, [activeLocation, dispatch]);

  return (
    <div className="page page--gray page--main">
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <LocationsList locations={locations} active={activeLocation}/>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.length} places to stay in Amsterdam</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <OffersList offers={offers}/>
            </section>
            <div className="cities__right-section">
              <Map city={locationsCoords[activeLocation]} points={points} selectedPoint={selectedPoint}/>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainPage;
