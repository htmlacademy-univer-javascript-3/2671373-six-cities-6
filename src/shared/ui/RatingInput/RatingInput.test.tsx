import {render, screen} from '@testing-library/react';
import RatingInput from './RatingInput';
import userEvent from '@testing-library/user-event';

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

  it('should call "setValue" on clicking radio', async () => {
    render(
      <RatingInput
        value={mockValue}
        setValue={mockHandleSetValue}
      />
    );

    const radio = screen.getByTestId('rating-radio-1');

    await userEvent.click(radio);
    expect(mockHandleSetValue).toBeCalled();
    expect(mockHandleSetValue).nthCalledWith(1, 1);
  });
});
