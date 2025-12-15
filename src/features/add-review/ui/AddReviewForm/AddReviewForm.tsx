import {FC} from 'react';
import {RatingInput} from '@/shared/ui/RatingInput';
import {SubmitHandler, useForm} from 'react-hook-form';

interface IAddReviewForm {
  sendComment: (comment: string, rating: number) => void;
}

type TReviewValues = {
  rating: number;
  comment: string;
}

const AddReviewForm: FC<IAddReviewForm> = (props) => {

  const { sendComment } = props;
  const {register, setValue, handleSubmit, watch} = useForm<TReviewValues>({
    defaultValues: {
      rating: 5,
      comment: ''
    },

  });

  const rating = watch('rating');

  const submitHandler: SubmitHandler<TReviewValues> = (values) => {
    sendComment(values.comment, values.rating);
  };

  // TODO add submit errors handler
  // const submitErrorHandler: SubmitErrorHandler<TReviewValues> = (errors) => {
  //
  // };

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form className="reviews__form form" onSubmit={handleSubmit(submitHandler)}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <RatingInput
        value={rating}
        setValue={(_rating) => setValue('rating', _rating)}
      />
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        {...register('comment', {required: 'Поле обязательно для заполнения'})}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe
          your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit">Submit</button>
      </div>
    </form>
  );
};

export default AddReviewForm;
