import {RouterProvider, createBrowserRouter, DOMRouterOpts} from 'react-router-dom';

import routes from './routes';
import {checkAuth} from '@/shared/store';
import {FC, useEffect} from 'react';
import {useAppDispatch} from '@/shared/hooks';

interface IRouter {
  options?: DOMRouterOpts;
}

const Router: FC<IRouter> = (props) => {
  const { options } = props;
  const router = createBrowserRouter(routes, options);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <RouterProvider router={router} />
  );
};

export default Router;
