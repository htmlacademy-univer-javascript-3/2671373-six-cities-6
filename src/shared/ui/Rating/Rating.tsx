import {FC} from 'react';

interface IRating {
  rating: number;
}

const Rating: FC<IRating> = (props) => {

  const { rating } = props;

  return (
    <div className="place-card__rating rating">
      <div className="place-card__stars rating__stars">
        <span data-testid="rating-span" style={{width: `${rating * 20}%`}}></span>
        <span className="visually-hidden">Rating</span>
      </div>
    </div>
  );
};

export default Rating;
