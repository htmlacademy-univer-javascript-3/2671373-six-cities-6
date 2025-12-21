import {render, screen} from '@testing-library/react';
import BookmarkButton from './BookmarkButton';
import userEvent from '@testing-library/user-event';

describe('Component: BookmarkButton', () => {
  const classActive = 'place-card__bookmark-button--active';
  const mockActive = false;
  const mockHandleClick = vi.fn();
  const mockId = '1';

  it('should render correctly', () => {
    render(
      <BookmarkButton
        active={mockActive}
        onClick={mockHandleClick}
        id={mockId}
      />
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).not.toHaveClass(classActive);

  });

  it('onChange should called when user clicks', async () => {
    render(
      <BookmarkButton
        active={mockActive}
        onClick={mockHandleClick}
        id={mockId}
      />
    );

    await userEvent.click(screen.getByRole('button'));
    expect(mockHandleClick).toBeCalled();
    expect(mockHandleClick).nthCalledWith(1);
  });

  it('active prop should change classes', () => {
    const { rerender } = render(
      <BookmarkButton
        active={mockActive}
        onClick={mockHandleClick}
        id={mockId}
      />
    );

    expect(screen.getByRole('button')).not.toHaveClass(classActive);

    rerender(
      <BookmarkButton
        active={!mockActive}
        onClick={mockHandleClick}
        id={mockId}
      />
    );

    expect(screen.getByRole('button')).toHaveClass(classActive);
  });
});


