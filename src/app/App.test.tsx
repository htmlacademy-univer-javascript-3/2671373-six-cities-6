import {render, screen, waitFor} from '@testing-library/react';
import {withStore} from '@/shared/utils/hocs.tsx';
import {MockMemoryRouter} from '@/shared/utils/mockComponents.tsx';
import {makeFakeOfferCard} from '@/shared/utils/mocks';
import {deleteToken, saveToken} from '@/shared/services';

describe('Application routing', () => {
  beforeEach(() => {
    deleteToken();
  });

  it('should render Main when user navigates to "/"', async () => {
    const {component, mockAxiosAdapter} = withStore(<MockMemoryRouter initialEntries={['/']}/>, {
      auth: {authorizationStatus: false, isLoading: false},
      offers: {offers: {}, isLoading: false},
      favorites: {favorites: {}, isLoading: false},
    });

    mockAxiosAdapter.resetHandlers();
    render(component);

    await waitFor(() => {
      expect(screen.getByText('Cities')).toBeInTheDocument();
    }, {timeout: 3000});

  });

  it('should render OfferPage when user navigates to "/offer/:id"', async () => {
    const {component} = withStore(<MockMemoryRouter initialEntries={['/offer/123']}/>, {
      auth: {authorizationStatus: false, isLoading: false},
      comments: {comments: [], isLoading: false},
      currentOffer: {currentOffer: makeFakeOfferCard(), isLoading: false},
      nearby: {offers: [], isLoading: false},
      favorites: {favorites: {}, isLoading: false},
    });
    render(component);

    await waitFor(() => {
      expect(screen.getByTestId('offer-name')).toBeInTheDocument();
    }, {timeout: 3000});

  });

  it('should render Login when user navigates to "/login"', async () => {
    const {component} = withStore(<MockMemoryRouter initialEntries={['/login']}/>, {
      auth: {authorizationStatus: false, isLoading: false},
    });

    render(component);

    await waitFor(() => {
      expect(screen.getByText('E-mail')).toBeInTheDocument();
      expect(screen.getByText('Password')).toBeInTheDocument();
    }, {timeout: 3000});

  });

  it('should render Favorites when user navigates to "/favorites"', async () => {
    const {component} = withStore(<MockMemoryRouter initialEntries={['/favorites']}/>, {
      auth: {authorizationStatus: true, isLoading: false},
      favorites: {favorites: {}, isLoading: false}
    });

    saveToken('test-token');
    render(component);

    await waitFor(() => {
      expect(screen.getByText('Saved listing')).toBeInTheDocument();
    }, {timeout: 3000});

  });

  it('should render Login when not authorized user navigates to "/favorites"', async () => {
    const {component} = withStore(<MockMemoryRouter initialEntries={['/favorites']}/>, {
      auth: {authorizationStatus: false, isLoading: false},
      favorites: {favorites: {}, isLoading: false}
    });

    render(component);

    await waitFor(() => {
      expect(screen.getByText('E-mail')).toBeInTheDocument();
      expect(screen.getByText('Password')).toBeInTheDocument();
    }, {timeout: 3000});

  });

  it('should render Offers  when authorized user navigates to "/login"', async () => {
    const {component} = withStore(<MockMemoryRouter initialEntries={['/login']}/>, {
      auth: {authorizationStatus: true, isLoading: false},
      offers: {offers: {}, isLoading: false},
      favorites: {favorites: {}, isLoading: false},
    });
    saveToken('test-token');
    render(component);

    await waitFor(() => {
      expect(screen.getByText('Cities')).toBeInTheDocument();
    }, {timeout: 3000});

  });

  it('should render 404 when user navigates to unknown route', async () => {
    const {component} = withStore(<MockMemoryRouter initialEntries={['/unknown-unknown']}/>, {
      auth: {authorizationStatus: false, isLoading: false},
    });
    render(component);

    await waitFor(() => {
      expect(screen.getByText('404 Not Found')).toBeInTheDocument();
    }, {timeout: 3000});
  });
});
