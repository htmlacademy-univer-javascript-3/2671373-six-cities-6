import {OffersList} from '@/entities/Offer';
import {currentCityMock, offersMock, pointsMock, selectedPointMock} from '@/shared/mocks';
import {FC, useLayoutEffect, useState} from 'react';
import {Map} from '@/widgets/Map/ui';
import {LocationsList} from './components/LocationsList';
import {useSearchParams} from 'react-router-dom';

const locations = [
  'Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'
];

const MainPage: FC = () => {

  const [searchParams] = useSearchParams();

  const [currentCity] = useState(currentCityMock);
  const [points] = useState(pointsMock);
  const [selectedPoint] = useState(selectedPointMock);
  const [activeLocation, setActiveLocation] = useState(searchParams.get('location') || locations[0]);

  useLayoutEffect(() => {
    const location = searchParams.get('location');
    if (location) {
      setActiveLocation(location);
    }
  }, [searchParams]);

  return (
    <div className="page page--gray page--main">
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <LocationsList locations={locations} active={activeLocation}/>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">312 places to stay in Amsterdam</b>
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
              <OffersList offers={offersMock}/>
            </section>
            <div className="cities__right-section">
              <Map city={currentCity} points={points} selectedPoint={selectedPoint}/>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainPage;
