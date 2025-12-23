import {render, screen} from '@testing-library/react';
import RatingInput from './RatingInput';

describe('Component: RatingInput', () => {
  const mockHandleSetValue = vi.fn();
  const mockValue = 5;

  it('should render correctly', () => {
    render(
      <RatingInput
        value={mockValue}
        setValue={mockHandleSetValue}
      />
    );

    expect(screen.getAllByRole('radio').length).toEqual(5);
    const elements = screen.getAllByRole('radio');
    elements.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });
});
