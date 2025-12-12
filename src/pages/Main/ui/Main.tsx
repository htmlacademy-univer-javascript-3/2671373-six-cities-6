import {OffersList} from '@/entities/Offer';
import {cities, citiesCoords} from '@/shared/mocks';
import {FC, useEffect, useMemo, useState} from 'react';
import {Map} from '@/widgets/Map/ui';
import {LocationsList} from './components/LocationsList';
import {useSearchParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {RootState, useAppDispatch, getOffersList} from '@/shared/store';
import {TLocation} from '@/shared/model/offer';
import { ClipLoader } from 'react-spinners';

const MainPage: FC = () => {

  const [searchParams] = useSearchParams();

  const dispatch = useAppDispatch();
  const {offers, isLoading} = useSelector((state: RootState) => state.offers);

  const [activeCity, setActiveCity] = useState(searchParams.get('city') || cities[0]);
  const [selectedPoint, setSelectedPoint] = useState<TLocation | undefined>(undefined);

  useEffect(() => {
    const city = searchParams.get('city');
    if (city) {
      setActiveCity(city);
    }
  }, [searchParams]);

  useEffect(() => {
    dispatch(getOffersList());
  }, [activeCity, dispatch]);

  const filteredOffers = useMemo(() => offers.filter((offer) => offer.city.name === activeCity), [offers, activeCity]);
  const offerLocations = useMemo(() => filteredOffers.map((offer) => offer.location), [filteredOffers]);
  const selectedCity = useMemo(() => filteredOffers?.[0]?.city || citiesCoords[activeCity], [filteredOffers, activeCity]);

  return (
    <div className="page page--gray page--main">
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <LocationsList locations={cities} active={activeCity}/>
        {
          isLoading
            ? <ClipLoader cssOverride={{margin: '0 auto'}} loading size={150}/>
            : (
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
                    <OffersList offers={filteredOffers}/>
                  </section>
                  <div className="cities__right-section">
                    <Map
                      city={selectedCity}
                      points={offerLocations}
                      selectedPoint={selectedPoint}
                      setSelectedPoint={setSelectedPoint}
                    />
                  </div>
                </div>
              </div>
            )
        }
      </main>
    </div>
  );
};

export default MainPage;
