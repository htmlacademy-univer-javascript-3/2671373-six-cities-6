import {makeFakeOffer} from '@/shared/utils/mocks';
import {render, screen} from '@testing-library/react';
import OfferCard from './OfferCard';
import {withRouter} from '@/shared/utils/hocs.tsx';
import userEvent from '@testing-library/user-event';

describe('entity: OfferCard', () => {
  const mockOffer = makeFakeOffer();
  const mockHandleChangeFavorite = vi.fn().mockResolvedValueOnce(undefined);
  it('should render correctly', () => {
    const {component} = withRouter(
      <OfferCard
        offer={mockOffer}
        changeFavoriteStatus={mockHandleChangeFavorite}
      />);

    render(component);

    expect(screen.getByTestId('offer-price')).toHaveTextContent(mockOffer.price.toString());
    expect(screen.getByTestId('offer-link')).toHaveTextContent(mockOffer.title);
  });

  it('should premium render work correctly', () => {
    const { rerender } = render(withRouter(
      <OfferCard
        offer={{...mockOffer, isPremium: true}}
        changeFavoriteStatus={mockHandleChangeFavorite}
      />).component);

    expect(screen.queryByTestId('offer-premium')).toBeInTheDocument();

    rerender(withRouter(
      <OfferCard
        offer={{...mockOffer, isPremium: false}}
        changeFavoriteStatus={mockHandleChangeFavorite}
      />).component);

    expect(screen.queryByTestId('offer-premium')).not.toBeInTheDocument();
  });

  it('should call "changeFavoriteStatus" on click', async () => {
    const {component} = withRouter(
      <OfferCard
        offer={mockOffer}
        changeFavoriteStatus={mockHandleChangeFavorite}
      />);

    render(component);

    await userEvent.click(screen.getByTestId('bookmarkbutton'));
    expect(mockHandleChangeFavorite).toBeCalled();
    expect(mockHandleChangeFavorite).nthCalledWith(1, mockOffer.id, !mockOffer.isFavorite);
  });
});
