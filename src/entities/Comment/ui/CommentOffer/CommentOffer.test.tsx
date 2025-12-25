import {makeFakeComment} from '@/shared/utils/mocks';
import {render, screen} from '@testing-library/react';
import CommentOffer from './CommentOffer';
import {formatDate} from 'date-fns';

describe('entity: CommentOffer', () => {
  it('should comment offer render correctly', () => {
    const mockComment = makeFakeComment();

    render(<CommentOffer comment={mockComment}/>);

    expect(screen.getByTestId('comment-user-name')).toHaveTextContent(mockComment.user.name, {normalizeWhitespace: false});
    expect(screen.getByTestId('comment-comment')).toHaveTextContent(mockComment.comment, {normalizeWhitespace: false});
    expect(screen.getByTestId('comment-date')).toHaveTextContent(formatDate(mockComment.date, 'MMMM yyyy'), {normalizeWhitespace: false});
    expect(screen.getByTestId('comment-rating')).toHaveStyle(`width: ${mockComment.rating * 20}%;`);
  });
});
