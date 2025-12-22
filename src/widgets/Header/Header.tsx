import {Link, useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {getFavoriteOffersList} from '@/shared/store';
import {logout} from '@/shared/store';
import {useCallback, useEffect, useMemo} from 'react';
import {selectProfileWithFavorites} from '@/shared/store/selectors';
import {State} from '@/shared/types';
import {useAppDispatch} from '@/shared/hooks';

const HeaderNavNotLogged = () => (
  <nav className="header__nav">
    <ul className="header__nav-list">
      <li className="header__nav-item user">
        <Link className="header__nav-link header__nav-link--profile" to='/login'>
          <div className="header__avatar-wrapper user__avatar-wrapper">
          </div>
          <span className="header__login">Sign in</span>
        </Link>
      </li>
    </ul>
  </nav>
);

const HeaderNavLogged = () => {
  const { profile, favorites } = useSelector(selectProfileWithFavorites);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutHandler = useCallback(() => {
    dispatch(logout()).then(() => navigate('/login'));
  }, [dispatch, navigate]);

  useEffect(() => {
    dispatch(getFavoriteOffersList());
  }, [dispatch]);

  const favoritesCount = useMemo(() => Object.values(favorites).flat(1).length, [favorites]);

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile" to='/favorites'>
            <div className="header__avatar-wrapper user__avatar-wrapper">
              <img src={profile?.avatarUrl} alt="avatar" className="user__avatar"/>
            </div>
            <span className="header__user-name user__name">{profile?.email}</span>
            <span className="header__favorite-count">{favoritesCount}</span>
          </Link>
        </li>
        <li className="header__nav-item">
          <a className="header__nav-link" href="#" onClick={logoutHandler}>
            <span className="header__signout">Sign out</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

const Header = () => {
  const { authorizationStatus } = useSelector((state: State) => state.auth);

  return (
    (
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link header__logo-link--active" to='/'>
                <img className="header__logo" src="/img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </Link>
            </div>
            {authorizationStatus ? <HeaderNavLogged/> : <HeaderNavNotLogged/>}
          </div>
        </div>
      </header>
    )
  );
};

export default Header;
