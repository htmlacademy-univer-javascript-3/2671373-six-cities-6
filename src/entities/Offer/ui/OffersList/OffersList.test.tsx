import {makeFakeOffer} from '@/shared/utils/mocks';
import {render, screen} from '@testing-library/react';
import OffersList from './OffersList';
import {withRouter} from '@/shared/utils/hocs';

describe('entity: OffersList', () => {
  const mockOffers = [makeFakeOffer(), makeFakeOffer(), makeFakeOffer()];
  const mockHandleChangeFavorite = vi.fn().mockResolvedValue(undefined);

  it('should render correctly', () => {
    render(withRouter(<OffersList offers={mockOffers} changeFavoriteStatus={mockHandleChangeFavorite}/>).component);

    expect(screen.getAllByTestId('offer').length).toEqual(mockOffers.length);
  });
});
