import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import routes from './routes';
import {useAppDispatch} from '@/shared/store';
import {checkAuth} from '@/shared/store/auth.ts';
import {useEffect} from 'react';

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
