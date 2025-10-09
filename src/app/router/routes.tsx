import {RouteObject} from 'react-router-dom';
import {PrivateRouteLoader} from '@/app/router/loader';

const routes: RouteObject[] = [
  {
    path: '/',
    errorElement: <h1>Error</h1>,
    loader: () => <h1>Loading</h1>,
    async lazy() {
      const { BaseLayout } = await import('@/app/layout/BaseLayout');
      return { Component: BaseLayout };
    },
    children: [
      {
        index: true,
        async lazy() {
          const { MainPage } = await import('@/pages/Main');
          return { Component: MainPage};
        }
      },
      {
        path: '/login',
        async lazy() {
          const { LoginPage } = await import('@/pages/Login');
          return { Component: LoginPage };
        }
      },
      {
        path: '/offer/:id',
        async lazy() {
          const { OfferPage } = await import('@/pages/Offer');
          return { Component: OfferPage };
        }
      },
      {
        path: '/favorites',
        loader: PrivateRouteLoader,
        async lazy() {
          const { FavoritesPage } = await import('@/pages/Favorites');
          return { Component: FavoritesPage };
        }
      }
    ]
  },
  {
    path: '*',
    async lazy() {
      const { NotFoundPage } = await import('@/pages/NotFound');
      return { Component: NotFoundPage };
    }
  }
];

export default routes;
