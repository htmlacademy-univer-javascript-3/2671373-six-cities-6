import {Outlet} from 'react-router-dom';
import {Header} from '@/widgets/Header';

const BaseLayout = () => (
  <div className="page page--gray page--main">
    <Header />
    <Outlet />
  </div>
);

export default BaseLayout;
