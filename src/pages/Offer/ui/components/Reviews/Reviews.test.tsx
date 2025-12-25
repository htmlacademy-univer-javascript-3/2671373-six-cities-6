import Reviews from './Reviews';
import {makeFakeComment} from '@/shared/utils/mocks.ts';
import {render, screen} from '@testing-library/react';

describe('page: Offer Reviews', () => {
  const mockComments = [makeFakeComment(), makeFakeComment()];
  const mockHandleSendComment = vi.fn();

  it('should render correctly', () => {
    const { rerender } = render(
      <Reviews
        comments={mockComments}
        isLoading
        sendComment={mockHandleSendComment}
        isAuthorized
      />
    );

    expect(screen.getByTestId('loading-wrapper')).toBeInTheDocument();
    expect(screen.queryByTestId('reviews-list')).not.toBeInTheDocument();

    rerender(
      <Reviews
        comments={mockComments}
        isLoading={false}
        sendComment={mockHandleSendComment}
        isAuthorized
      />
    );

    expect(screen.queryByTestId('loading-wrapper')).not.toBeInTheDocument();
    expect(screen.getByTestId('reviews-list')).toBeInTheDocument();
  });

  it('should render form when authorized', () => {
    const { rerender } = render(
      <Reviews
        comments={mockComments}
        isLoading={false}
        sendComment={mockHandleSendComment}
        isAuthorized={false}
      />
    );

    expect(screen.queryByTestId('review-form')).not.toBeInTheDocument();

    rerender(
      <Reviews
        comments={mockComments}
        isLoading={false}
        sendComment={mockHandleSendComment}
        isAuthorized
      />
    );

    expect(screen.getByTestId('review-form')).toBeInTheDocument();
  });
});
