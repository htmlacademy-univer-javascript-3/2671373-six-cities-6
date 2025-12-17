import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import routes from './routes';
import {checkAuth} from '@/shared/store';
import {useEffect} from 'react';
import {useAppDispatch} from '@/shared/hooks';

const Router = () => {
  const router = createBrowserRouter(routes);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <RouterProvider router={router} />
  );
};

export default Router;
