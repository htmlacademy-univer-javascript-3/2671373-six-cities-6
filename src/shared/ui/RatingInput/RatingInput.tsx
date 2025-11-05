import {ChangeEventHandler, Dispatch, FC, Fragment} from 'react';

interface IRatingInput {
  // value: number;
  // setValue: Dispatch<SetStateAction<number>>;
  setValue: Dispatch<number>;
}

const ratings = [
  { value: 5, title: 'perfect' },
  { value: 4, title: 'good'},
  { value: 3, title: 'not bad'},
  { value: 2, title: 'badly' },
  { value: 1, title: 'terribly' },
] as const;

const RatingInput: FC<IRatingInput> = (props) => {
  const { setValue } = props;

  const handleChangeRating: ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value as unknown as number);
  };

  return (
    <div className="reviews__rating-form form__rating">
      {ratings.map((rating) => {
        const { value: count, title } = rating;
        const id = `${count}-stars`;

        return (
          <Fragment key={id}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={count}
              id={id}
              type="radio"
              onChange={handleChangeRating}
            />
            <label
              htmlFor={id}
              className="reviews__rating-label form__rating-label"
              title={title}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        );
      })}
    </div>
  );
};

export default RatingInput;
