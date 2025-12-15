import {TComment} from '@/shared/model/comment';
import {FC} from 'react';
import {LoadingWrapper} from '@/shared/ui/LoadingWrapper';
import {AddReviewForm} from '@/features/add-review/ui/AddReviewForm';

interface IReviews {
  comments: TComment[];
  isLoading: boolean;
  sendComment: (comment: string, rating: number) => void;
}

const Reviews: FC<IReviews> = (props) => {

  const { comments, isLoading, sendComment } = props;

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
      <LoadingWrapper isLoading={isLoading}>
        <ul className="reviews__list">
          {comments.map((comment) => (
            <li className="reviews__item" key={comment.id}>
              <div className="reviews__user user">
                <div className="reviews__avatar-wrapper user__avatar-wrapper">
                  <img
                    className="reviews__avatar user__avatar"
                    src={comment.user.avatarUrl}
                    width="54"
                    height="54"
                    alt="Reviews avatar"
                  />
                </div>
                <span className="reviews__user-name">{comment.user.name}</span>
              </div>
              <div className="reviews__info">
                <div className="reviews__rating rating">
                  <div className="reviews__stars rating__stars">
                    <span style={{width: `${comment.rating * 20}%`}}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                </div>
                <p className="reviews__text">{comment.comment}</p>
                {/*TODO add date lib*/}
                <time className="reviews__time" dateTime={comment.date}>{comment.date}</time>
              </div>
            </li>
          ))}
        </ul>
      </LoadingWrapper>
      <AddReviewForm sendComment={sendComment}/>
    </section>
  );
};

export default Reviews;
