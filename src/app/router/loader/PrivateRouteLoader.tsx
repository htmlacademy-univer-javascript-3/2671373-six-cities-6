import {redirect} from 'react-router-dom';
import Cookies from 'js-cookie';

const privateRouteLoader = () => {

  const token = Cookies.get('token');

  if (!token) {
    throw redirect('/login');
  }

  return null;
};

export default privateRouteLoader;
