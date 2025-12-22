import {Dispatch, FC, useState} from 'react';
import classNames from 'classnames';
import {TOffer} from '@/shared/model/offer';

export type TSorting = {
  value: string;
  compareFunc?: (a: TOffer, b: TOffer) => number;
}

interface ISortOffersPopup {
  sorting: TSorting;
  setSorting: Dispatch<TSorting>;
  options: TSorting[];
}

const SortOffersPopup: FC<ISortOffersPopup> = (props) => {

  const [open, setOpen] = useState(false);
  const {sorting, setSorting, options} = props;

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption" >Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={() => setOpen((p) => !p)}>
        {sorting.value}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={classNames('places__options places__options--custom', open && 'places__options--opened')}>
        {options.map((option) => (
          <li
            className={classNames('places__option', sorting.value === option.value && 'places__option--active')}
            key={option.value}
            tabIndex={0}
            onClick={() => setSorting(option)}
          >
            {option.value}
          </li>
        ))}
      </ul>
    </form>
  );
};

export default SortOffersPopup;
