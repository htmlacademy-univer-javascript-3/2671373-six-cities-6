import ICommentOffer from './CommentOffer.type.ts';
import {FC, memo} from 'react';
import {formatDate} from 'date-fns';

const CommentOffer: FC<ICommentOffer> = memo((props: ICommentOffer) => {
  const { comment } = props;

  return (
    <li className="reviews__item">
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
        <time
          className="reviews__time"
          dateTime={formatDate(comment.date, 'yyyy-MM-dd')}
        >
          {formatDate(comment.date, 'MMMM yyyy')}
        </time>
      </div>
    </li>
  );
});

CommentOffer.displayName = 'CommentOffer';

export default CommentOffer;
