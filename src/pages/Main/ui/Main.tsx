import {OffersList} from '@/entities/Offer';
import {cities, citiesCoords} from '@/shared/mocks';
import {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {Map, TMapPoint} from '@/widgets/Map/ui';
import {LocationsList} from './components/LocationsList';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {
  getOffersList,
  changeOfferFavoriteStatus,
  getFavoriteOffersList
} from '@/shared/store';
import {TOffer} from '@/shared/model/offer';
import {LoadingWrapper} from '@/shared/ui/LoadingWrapper';
import {AxiosResponse} from 'axios';
import {SortOffersPopup} from '@/features/sort-offers/ui/SortOffersPopup';
import * as classNames from 'classnames';
import {useAppDispatch} from '@/shared/hooks';
import {State} from '@/shared/types';

const sortingOptions = [
  {value: 'Popular'},
  {value: 'Price: low to high', compareFunc: (a: TOffer, b: TOffer) => a.price - b.price},
  {value: 'Price: high to low', compareFunc: (a: TOffer, b: TOffer) => b.price - a.price},
  {value: 'Top rated first', compareFunc: (a: TOffer, b: TOffer) => b.rating - a.rating},
];

const MainPage: FC = () => {

  const [searchParams] = useSearchParams();
  const [offersSorting, setOfferSorting] = useState(sortingOptions[0]);
  const [selectedOffer, setSelectedOffer] = useState<TMapPoint>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {offers, isLoading} = useSelector((state: State) => state.offers);

  const [activeCity, setActiveCity] = useState(searchParams.get('city') || cities[0]);

  useEffect(() => {
    const city = searchParams.get('city');
    if (city) {
      setActiveCity(city);
    }
  }, [searchParams]);

  useEffect(() => {
    dispatch(getOffersList());
  }, [activeCity, dispatch]);

  const handleChangeOfferFavoriteStatus = useCallback(async (id: string, favorite: boolean) => {
    const response = await dispatch(changeOfferFavoriteStatus({id, favorite}));
    const payload = response.payload as AxiosResponse;
    if ('status' in payload && payload.status === 401) {
      navigate('/login');
    }
    await dispatch(getFavoriteOffersList());
  }, [dispatch, navigate]);

  const handleSelectOffer = useCallback((offer?: TOffer) => {
    if (!offer) {
      setSelectedOffer(undefined);
      return;
    }
    setSelectedOffer({id: offer.id, location: offer.location});
  }, []);

  const filteredOffers = useMemo(() => offers[activeCity] || [], [offers, activeCity]);
  const sortedOffers = useMemo(() => {
    if (!offersSorting.compareFunc) {
      return [...filteredOffers];
    }
    return [...filteredOffers].sort((a, b) => offersSorting.compareFunc(a, b));
  }, [offersSorting, filteredOffers]);
  const offerLocations = useMemo(() => filteredOffers.map((offer) => ({
    id: offer.id,
    location: offer.location
  })), [filteredOffers]);

  const isPageEmpty = sortedOffers.length === 0;

  return (
    <div className="page page--gray page--main">
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <LocationsList locations={cities} active={activeCity}/>
        <LoadingWrapper isLoading={isLoading}>
          <div className="cities">
            <div className={classNames('cities__places-container container', isPageEmpty && 'cities__places-container--empty')}>
              {isPageEmpty ? (
                <section className="cities__no-places">
                  <div className="cities__status-wrapper tabs__content">
                    <b className="cities__status">No places to stay available</b>
                    <p className="cities__status-description">We could not find any property available at the moment in {activeCity}
                    </p>
                  </div>
                </section>
              ) : (
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{filteredOffers.length} places to stay in {activeCity}</b>
                  <SortOffersPopup
                    sorting={offersSorting}
                    setSorting={setOfferSorting}
                    options={sortingOptions}
                  />
                  <div className="cities__places-list places__list tabs__content">
                    <OffersList
                      offers={sortedOffers}
                      changeFavoriteStatus={handleChangeOfferFavoriteStatus}
                      selectOffer={handleSelectOffer}
                    />
                  </div>
                </section>
              )}
              <div className="cities__right-section">
                <Map
                  city={citiesCoords[activeCity]}
                  points={offerLocations}
                  selectedPoint={selectedOffer}
                />
              </div>
            </div>
          </div>
        </LoadingWrapper>
      </main>
    </div>
  );
};

export default MainPage;
