import {withRouter, withStore} from '@/shared/utils/hocs.tsx';
import {makeFakeOffer} from '@/shared/utils/mocks.ts';
import {render, screen} from '@testing-library/react';
import {MainPage} from '@/pages/Main';
import userEvent from '@testing-library/user-event';

describe('page: Main', () => {
  const mockOffersState = {
    Amsterdam: [makeFakeOffer(), makeFakeOffer()],
    Paris: [makeFakeOffer(), makeFakeOffer(), makeFakeOffer()],
  };

  it('should render correctly', () => {
    const {component: routerComponent} = withRouter(<MainPage/>);
    const {component} = withStore(routerComponent, {
      offers: {
        offers: mockOffersState,
        isLoading: false
      }
    });

    render(component);

    expect(screen.getByTestId('offers-list')).toBeInTheDocument();
    expect(screen.getByTestId('offers-locations')).toBeInTheDocument();
    expect(screen.getByTestId('offers-map')).toBeInTheDocument();
  });

  it('should render new offers on changing city', async () => {
    const {component: routerComponent} = withRouter(<MainPage/>);
    const {component} = withStore(routerComponent, {
      offers: {
        offers: mockOffersState,
        isLoading: false
      }
    });

    render(component);

    await userEvent.click(screen.getByTestId('location-Amsterdam'));
    expect(screen.getByTestId('offers-list').children).toHaveLength(mockOffersState['Amsterdam'].length);
  });
});
