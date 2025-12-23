import {render, screen} from '@testing-library/react';
import Rating from './Rating';

describe('Component: Rating', () => {
  const mockRating = 4;
  it('should render correctly', () => {
    render(
      <Rating
        rating={mockRating}
      />
    );

    expect(screen.getByText('Rating')).toBeInTheDocument();
    expect(screen.getByTestId('rating-span')).toHaveStyle(`width: ${mockRating * 20}%`);
  });
});
