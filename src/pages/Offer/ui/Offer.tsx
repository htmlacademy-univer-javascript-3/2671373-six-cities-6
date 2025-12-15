import {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {useSelector} from 'react-redux';
import {
  getOfferById,
  RootState,
  useAppDispatch,
  getNearOffers,
  getComments,
  sendComment,
  changeOfferFavoriteStatus, getFavoriteOffersList
} from '@/shared/store';
import {useNavigate, useParams} from 'react-router-dom';
import {Map, TMapPoint} from '@/widgets/Map/ui';
import {NearOffers} from './components/NearOffers';
import {AxiosResponse} from 'axios';
import {LoadingWrapper} from '@/shared/ui/LoadingWrapper';
import {Reviews} from '@/pages/Offer/ui/components/Reviews';
import {TOffer} from '@/shared/model/offer';
import {selectOfferPageData} from '@/shared/store/selectors';

const OfferPage: FC = () => {

  const params = useParams<string>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const selectState = useSelector((state: RootState) => state);
  const {
    nearbyOffers,
    currentOffer,
    isNearbyOffersLoading,
    comments,
    isCurrentOfferLoading,
    isCommentsLoading
  } = selectOfferPageData(selectState);
  const {authorizationStatus} = useSelector((state: RootState) => state.auth);
  const [selectedOffer, setSelectedOffer] = useState<TMapPoint>();

  const sendCommentHandler = useCallback((comment: string, rating: number) => {
    if (!params.id) {
      return;
    }
    dispatch(sendComment({id: params.id, comment, rating})).then(() => {
      dispatch(getComments(params.id as string));
    });
  }, [dispatch, params.id]);

  const changeOfferFavoriteStatusHandler = useCallback(async (id: string, favorite: boolean) => {
    const response = await dispatch(changeOfferFavoriteStatus({id, favorite}));
    const payload = response.payload as AxiosResponse;
    if ('status' in payload && payload.status === 401) {
      navigate('/login');
    }
    await dispatch(getFavoriteOffersList());
  }, [dispatch, navigate]);

  useEffect(() => {
    if (!params.id) {
      return;
    }
    dispatch(getOfferById(params.id)).then((r) => {
      const payload = r.payload as AxiosResponse;
      if ('status' in payload) {
        if (payload.status === 404) {
          navigate('/404');
        }
      }
    });
    dispatch(getNearOffers(params.id));
    dispatch(getComments(params.id));
  }, [params.id, dispatch, navigate]);

  const nearOffersPoints = useMemo(() => nearbyOffers.map((offer) => ({id: offer.id, location: offer.location})), [nearbyOffers]);

  const handleSelectOffer = useCallback((offer?: TOffer) => {
    if (!offer) {
      setSelectedOffer(undefined);
      return;
    }
    setSelectedOffer({id: offer.id, location: offer.location});
  }, []);

  return (
    <div className="page">

      <main className="page__main page__main--offer">
        <LoadingWrapper isLoading={isCurrentOfferLoading}>
          <section className="offer">
            <div className="offer__gallery-container container">
              <div className="offer__gallery">
                {currentOffer?.images.map((image) => (
                  <div className="offer__image-wrapper" key={image}>
                    <img className="offer__image" src={image} alt="Photo studio"/>
                  </div>
                ))}
              </div>
            </div>
            <div className="offer__container container">
              <div className="offer__wrapper">
                {currentOffer?.isPremium && (
                  <div className="offer__mark">
                    <span>Premium</span>
                  </div>
                )}
                <div className="offer__name-wrapper">
                  <h1 className="offer__name">
                    {currentOffer?.title}
                  </h1>
                  <button className="offer__bookmark-button button" type="button">
                    <svg className="offer__bookmark-icon" width="31" height="33">
                      <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                </div>
                <div className="offer__rating rating">
                  <div className="offer__stars rating__stars">
                    <span style={{width: `${(currentOffer?.rating || 5) * 20}%`}}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="offer__rating-value rating__value">{currentOffer?.rating}</span>
                </div>
                <ul className="offer__features">
                  <li className="offer__feature offer__feature--entire">
                    {currentOffer?.type}
                  </li>
                  <li className="offer__feature offer__feature--bedrooms">
                    {currentOffer?.bedrooms} Bedrooms
                  </li>
                  <li className="offer__feature offer__feature--adults">
                    Max {currentOffer?.maxAdults} adults
                  </li>
                </ul>
                <div className="offer__price">
                  <b className="offer__price-value">&euro;{currentOffer?.price}</b>
                  <span className="offer__price-text">&nbsp;night</span>
                </div>
                <div className="offer__inside">
                  <h2 className="offer__inside-title">What&apos;s inside</h2>
                  <ul className="offer__inside-list">
                    {currentOffer?.goods.map((good) => (
                      <li className="offer__inside-item" key={good}>
                        {good}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="offer__host">
                  <h2 className="offer__host-title">Meet the host</h2>
                  <div className="offer__host-user user">
                    <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                      <img
                        className="offer__avatar user__avatar"
                        src={currentOffer?.host.avatarUrl}
                        width="74"
                        height="74"
                        alt="Host avatar"
                      />
                    </div>
                    <span className="offer__user-name">{currentOffer?.host.name}</span>
                    {currentOffer?.host.isPro && (<span className="offer__user-status">Pro</span>)}
                  </div>
                  <div className="offer__description">
                    <p className="offer__text">{currentOffer?.description}</p>
                  </div>
                </div>
                <Reviews
                  isAuthorized={authorizationStatus}
                  comments={comments}
                  isLoading={isCommentsLoading}
                  sendComment={sendCommentHandler}
                />
              </div>
            </div>
            <section className="offer__map map">
              {!!currentOffer && (
                <Map
                  city={currentOffer.city}
                  points={nearOffersPoints}
                  selectedPoint={selectedOffer}
                />
              )}
            </section>
          </section>
          <NearOffers
            isLoading={isNearbyOffersLoading}
            offers={nearbyOffers}
            changeOfferFavoriteStatus={changeOfferFavoriteStatusHandler}
            selectOffer={handleSelectOffer}
          />
        </LoadingWrapper>
      </main>
    </div>
  );
};

export default OfferPage;
