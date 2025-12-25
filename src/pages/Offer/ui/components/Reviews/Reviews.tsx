import {TComment} from '@/shared/model/comment';
import {FC, memo} from 'react';
import {LoadingWrapper} from '@/shared/ui/LoadingWrapper';
import {AddReviewForm} from '@/features/add-review/ui/AddReviewForm';
import {CommentOffer} from '@/entities/Comment/ui';

interface IReviews {
  comments: TComment[];
  isLoading: boolean;
  sendComment: (comment: string, rating: number) => void;
  isAuthorized: boolean;
}

const Reviews: FC<IReviews> = memo((props: IReviews) => {

  const { comments, isLoading, sendComment, isAuthorized } = props;

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
      <LoadingWrapper isLoading={isLoading}>
        <ul
          data-testid="reviews-list"
          className="reviews__list"
        >
          {comments.map((comment) => (
            <CommentOffer comment={comment} key={comment.id}/>
          ))}
        </ul>
      </LoadingWrapper>
      {isAuthorized && (<AddReviewForm sendComment={sendComment}/>)}
    </section>
  );
});

Reviews.displayName = 'Reviews';

export default Reviews;
