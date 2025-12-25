import {render, screen} from '@testing-library/react';
import AddReviewForm from './AddReviewForm';
import userEvent from '@testing-library/user-event';

describe('feature: AddReviewForm', () => {
  const mockHandleSendComment = vi.fn();

  it('should render correctly', () => {
    render(<AddReviewForm sendComment={mockHandleSendComment}/>);

    expect(screen.getByTestId('review-form')).toBeInTheDocument();
    expect(screen.getByTestId('review-form-textarea')).toBeInTheDocument();
    expect(screen.getByTestId('review-form-submit')).toBeInTheDocument();
  });

  it('should call "sendComment" on submitting form', async () => {
    const mockTypedText = 'comment';
    render(<AddReviewForm sendComment={mockHandleSendComment}/>);

    await userEvent.type(screen.getByTestId('review-form-textarea'), mockTypedText);
    await userEvent.click(screen.getByTestId('review-form-submit'));
    expect(mockHandleSendComment).toBeCalled();
    expect(mockHandleSendComment).nthCalledWith(1, mockTypedText, 5);
  });
});
