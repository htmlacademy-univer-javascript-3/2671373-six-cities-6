import classNames from 'classnames';
import {FC} from 'react';

interface IBookmarkButton {
  id?: string;
  active?: boolean;
  onClick?: () => void;
}

const BookmarkButton: FC<IBookmarkButton> = (props) => {

  const { onClick, active, id } = props;

  return (
    <button
      id={id}
      className={classNames(
        'place-card__bookmark-button',
        active && 'place-card__bookmark-button--active',
        'button'
      )}
      type="button"
      onClick={() => onClick?.()}
    >
      <svg className="place-card__bookmark-icon" width="18" height="19">
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{active ? 'In' : 'To'} bookmarks</span>
    </button>
  );
};

export default BookmarkButton;
