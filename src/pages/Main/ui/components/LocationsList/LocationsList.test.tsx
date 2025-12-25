import {render, screen} from '@testing-library/react';
import LocationsList from './LocationsList';
import {withRouter} from '@/shared/utils/hocs.tsx';

describe('page: Main LocationsList', () => {
  const mockLocations = ['Amsterdam', 'Paris', 'Cologne'];
  const mockActiveClass = 'tabs__item--active';

  it('should render correctly', () => {
    render(withRouter(
      <LocationsList
        locations={mockLocations}
        active="Amsterdam"
      />
    ).component);

    expect(screen.getByTestId('offers-locations')).toBeInTheDocument();
    screen.getAllByTestId(/location.*/).forEach((location) => {
      expect(location).toBeInTheDocument();
    });
  });

  it('should active state work correctly', () => {
    render(withRouter(
      <LocationsList
        locations={mockLocations}
        active="Amsterdam"
      />
    ).component);

    expect(screen.getByTestId('location-Amsterdam')).toHaveClass(mockActiveClass);
  });
});
