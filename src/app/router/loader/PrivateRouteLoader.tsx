import {redirect} from 'react-router-dom';

const PrivateRouteLoader = () => {

  const authorized = true;

  if (!authorized) {
    throw redirect('/login');
  }

  return null;
};

export default PrivateRouteLoader;
