import {Outlet} from 'react-router-dom';

const AuthLayout = () => (
  <div className="page page--gray page--login">
    <Outlet/>
  </div>
);

export default AuthLayout;
