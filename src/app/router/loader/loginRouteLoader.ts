import {redirect} from 'react-router-dom';
import {getToken} from '@/shared/services';

const privateRouteLoader = () => {

  const token = getToken();

  if (token) {
    throw redirect('/');
  }

  return null;
};

export default privateRouteLoader;
