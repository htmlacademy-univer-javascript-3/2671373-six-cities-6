import {redirect} from 'react-router-dom';

const PrivateRouteLoader = () => {

  const authorized = false;

  if (!authorized) {
    throw redirect('/login');
  }

  return null;
};

export default PrivateRouteLoader;
