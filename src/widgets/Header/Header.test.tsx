import Header from './Header';
import {makeFakeOffer, makeFakeProfile} from '@/shared/utils/mocks';
import {render, screen} from '@testing-library/react';
import {withRouter, withStore} from '@/shared/utils/hocs.tsx';

describe('widget: Header', () => {
  const mockProfile = makeFakeProfile();
  const mockFavorites = [makeFakeOffer(), makeFakeOffer()];

  it('should not logged render correctly', () => {
    const { component: routerComponent } = withRouter(<Header/>);
    const { component } = withStore(routerComponent, {
      auth: {
        isLoading: false,
        authorizationStatus: false,
      }
    });
    render(component);

    expect(screen.getByTestId('header-not-logged')).toBeInTheDocument();
  });

  it('should logged render correctly', () => {
    const { component: routerComponent } = withRouter(<Header/>);
    const { component } = withStore(routerComponent, {
      auth: {
        isLoading: false,
        authorizationStatus: true,
        profile: mockProfile,
      },
      favorites: {
        isLoading: false,
        favorites: { ['Amsterdam']: mockFavorites }
      }
    });
    render(component);

    expect(screen.getByTestId('header-logged')).toBeInTheDocument();
    expect(screen.getByTestId('header-favorites-count')).toHaveTextContent('2');
  });
});
