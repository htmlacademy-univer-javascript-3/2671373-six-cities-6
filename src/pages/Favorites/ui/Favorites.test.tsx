import {deleteToken, saveToken} from '@/shared/services';
import {withRouter, withStore} from '@/shared/utils/hocs';
import { FavoritesPage } from '@/pages/Favorites';
import {render, screen} from '@testing-library/react';
import {makeFakeOffer} from '@/shared/utils/mocks.ts';

describe('page: Favorites', () => {
  const mockCityName = 'Amsterdam';

  beforeAll(() => {
    saveToken('favorites-test-token');
  });

  afterAll(() => {
    deleteToken();
  });

  it('should render correctly', () => {
    const { component: routerComponent } = withRouter(<FavoritesPage/>);
    const { component, mockStore } = withStore(routerComponent, {
      favorites: {
        favorites: { [mockCityName]: [makeFakeOffer()] },
        isLoading: false
      }
    });

    render(component);

    const offersList = screen.getByTestId('favorites-offers-list');
    expect(screen.queryByTestId('loading-wrapper')).not.toBeInTheDocument();
    expect(screen.queryByTestId('favorites-empty')).not.toBeInTheDocument();
    expect(screen.getByText(mockCityName)).toBeInTheDocument();
    expect(offersList).toBeInTheDocument();
    expect(offersList.children.length).toEqual(mockStore.getState().favorites?.favorites?.[mockCityName]?.length);
  });

  it('should render loading correctly', () => {
    const { component: routerComponent } = withRouter(<FavoritesPage/>);
    const { component } = withStore(routerComponent, {
      favorites: {
        favorites: { },
        isLoading: true
      }
    });

    render(component);

    const offersList = screen.queryByTestId('favorites-offers-list');
    expect(offersList).not.toBeInTheDocument();
    expect(screen.queryByTestId('favorites-empty')).not.toBeInTheDocument();
    expect(screen.getByTestId('loading-wrapper')).toBeInTheDocument();
  });

  it('should render empty state correctly', () => {
    const { component: routerComponent } = withRouter(<FavoritesPage/>);
    const { component } = withStore(routerComponent, {
      favorites: {
        favorites: { },
        isLoading: false
      }
    });

    render(component);

    const offersList = screen.queryByTestId('favorites-offers-list');
    expect(offersList).not.toBeInTheDocument();
    expect(screen.queryByTestId('loading-wrapper')).not.toBeInTheDocument();
    expect(screen.getByTestId('favorites-empty')).toBeInTheDocument();
  });
});
