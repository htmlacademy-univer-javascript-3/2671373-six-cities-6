import {FC} from 'react';
import {RatingInput} from '@/shared/ui/RatingInput';
import {SubmitHandler, useForm} from 'react-hook-form';

interface IAddReviewForm {
  // id: string;
}

type TReviewValues = {
  rating: number;
  review: string;
}

const AddReviewForm: FC<IAddReviewForm> = () => {

  // const { id } = props;
  const { register, setValue, handleSubmit } = useForm<TReviewValues>({});

  // const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
  //   event.preventDefault();
  //   console.log('get', getValues());
  //   handleSubmit((values) => {
  //     // console.log(id);
  //     console.log(values);
  //   }, () => {
  //     console.log('invalid');
  //   });
  // };

  const onSubmit: SubmitHandler<TReviewValues> = async (_, event) => {
    event?.preventDefault();
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit(onSubmit)}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <RatingInput setValue={(rating) => setValue('rating', rating)}/>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        {...register('review')}
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
