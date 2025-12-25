import {makeFakeOffer} from '@/shared/utils/mocks';
import {render, screen} from '@testing-library/react';
import {withRouter} from '@/shared/utils/hocs';
import NearOffers from './NearOffers';

describe('page: Offer NearOffers', () => {
  const mockOffers = [ makeFakeOffer(), makeFakeOffer(), makeFakeOffer() ];
  const mockHandleChangeFavorite = vi.fn();
  const mockHandleSelectOffer = vi.fn();

  it('should render correctly', () => {
    const {rerender} = render(
      withRouter(
        <NearOffers
          offers={mockOffers}
          isLoading
          changeOfferFavoriteStatus={mockHandleChangeFavorite}
          selectOffer={mockHandleSelectOffer}
        />
      ).component
    );

    expect(screen.getByTestId('loading-wrapper')).toBeInTheDocument();

    rerender(
      withRouter(
        <NearOffers
          offers={mockOffers}
          isLoading={false}
          changeOfferFavoriteStatus={mockHandleChangeFavorite}
          selectOffer={mockHandleSelectOffer}
        />
      ).component
    );

    expect(screen.queryByTestId('loading-wrapper')).not.toBeInTheDocument();
    expect(screen.getByTestId('offers-list')).toBeInTheDocument();
  });
});
