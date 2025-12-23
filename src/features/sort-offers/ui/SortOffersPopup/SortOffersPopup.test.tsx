import {render, screen} from '@testing-library/react';
import SortOffersPopup from './SortOffersPopup';
import userEvent from '@testing-library/user-event';

describe('feature: SortOffersPopup', () => {
  const mockHandleSetSorting = vi.fn();
  const mockSortingValue = { value: 'Popular' };
  const mockSortingOptions = [
    {value: 'Popular'},
    {value: 'Price: low to high', compareFunc: vi.fn()},
    {value: 'Price: high to low', compareFunc: vi.fn()},
    {value: 'Top rated first', compareFunc: vi.fn()},
  ];

  it('should render correctly', () => {
    render(
      <SortOffersPopup
        sorting={mockSortingValue}
        setSorting={mockHandleSetSorting}
        options={mockSortingOptions}
      />
    );

    expect(screen.getByTestId('sort-offers-popup-form')).toBeInTheDocument();
    expect(screen.getByTestId('sort-offers-popup-btn')).toBeInTheDocument();
    expect(screen.getByTestId('sort-offers-popup-list')).toBeInTheDocument();
    expect(screen.getByTestId('sort-offers-popup-list')).toBeInTheDocument();
    screen.getAllByTestId('sort-offers-popup-option').forEach((option) => {
      expect(option).toBeInTheDocument();
    });
  });

  it('should call "setSorting" on click', async () => {
    render(
      <SortOffersPopup
        sorting={mockSortingValue}
        setSorting={mockHandleSetSorting}
        options={mockSortingOptions}
      />
    );

    await userEvent.click(screen.getAllByTestId('sort-offers-popup-option')[1]);
    expect(mockHandleSetSorting).toBeCalled();
    expect(mockHandleSetSorting).nthCalledWith(1, mockSortingOptions[1]);
  });

  it('should open popup on click', async () => {
    const {rerender} = render(
      <SortOffersPopup
        sorting={mockSortingValue}
        setSorting={mockHandleSetSorting}
        options={mockSortingOptions}
      />
    );

    expect(screen.getByTestId('sort-offers-popup-list')).not.toHaveClass('places__options--opened');

    await userEvent.click(screen.getByTestId('sort-offers-popup-btn'));

    rerender(
      <SortOffersPopup
        sorting={mockSortingValue}
        setSorting={mockHandleSetSorting}
        options={mockSortingOptions}
      />
    );

    expect(screen.getByTestId('sort-offers-popup-list')).toHaveClass('places__options--opened');
  });
});
