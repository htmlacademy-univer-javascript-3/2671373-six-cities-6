import {makeFakeComment, makeFakeOffer, makeFakeOfferCard} from '@/shared/utils/mocks.ts';
import OfferPage from './Offer';
import {withRouter, withStore} from '@/shared/utils/hocs';
import {render, screen} from '@testing-library/react';

describe('page: Offer', () => {
  const mockOffer = makeFakeOfferCard();
  const mockOffers = [makeFakeOffer(), makeFakeOffer()];
  const mockComments = [makeFakeComment(), makeFakeComment()];

  it('should render correctly', () => {
    const { component: routerComponent } = withRouter(<OfferPage />);
    const { component } = withStore(routerComponent, {
      currentOffer: {
        isLoading: false,
        currentOffer: mockOffer,
      },
      comments: {
        isLoading: false,
        comments: mockComments,
      },
      nearby: {
        isLoading: false,
        offers: mockOffers,
      },
      auth: {
        authorizationStatus: false,
        isLoading: false,
      }
    });

    render(component);

    expect(screen.getByTestId('offer-card-name')).toBeInTheDocument();
    expect(screen.getByTestId('offer-card-rating')).toBeInTheDocument();
    expect(screen.getByTestId('offer-card-features')).toBeInTheDocument();
    expect(screen.getByTestId('offer-card-price')).toBeInTheDocument();
    expect(screen.getByTestId('offer-card-inside')).toBeInTheDocument();
  });

  it('should render premium mark', () => {
    const { component: routerComponent } = withRouter(<OfferPage />);
    const { component } = withStore(routerComponent, {
      currentOffer: {
        isLoading: false,
        currentOffer: { ...mockOffer, isPremium: true },
      },
      comments: {
        isLoading: false,
        comments: mockComments,
      },
      nearby: {
        isLoading: false,
        offers: mockOffers,
      },
      auth: {
        authorizationStatus: false,
        isLoading: false,
      }
    });

    render(component);

    expect(screen.getByTestId('offer-card-premium')).toBeInTheDocument();
  });

  it('should render host pro mark', () => {
    const { component: routerComponent } = withRouter(<OfferPage />);
    const { component } = withStore(routerComponent, {
      currentOffer: {
        isLoading: false,
        currentOffer: { ...mockOffer, host: {...mockOffer.host, isPro: true } },
      },
      comments: {
        isLoading: false,
        comments: mockComments,
      },
      nearby: {
        isLoading: false,
        offers: mockOffers,
      },
      auth: {
        authorizationStatus: false,
        isLoading: false,
      }
    });

    render(component);

    expect(screen.getByTestId('offer-card-host-pro')).toBeInTheDocument();
  });
});
