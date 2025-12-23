import {RouteObject} from 'react-router-dom';
import {loginRouteLoader, privateRouteLoader} from '@/app/router/loader';

const routes: RouteObject[] = [
  {
    path: '/',
    HydrateFallback: () => <div data-testid='loader'>Loading...</div>,
    async lazy() {
      const { MainLayout } = await import('@/app/layout/MainLayout');
      return { Component: MainLayout };
    },
    children: [
      {
        index: true,
        async lazy() {
          const { MainPage } = await import('@/pages/Main');
          return { Component: MainPage};
        }
      },
    ]
  },
  {
    path: '/',
    HydrateFallback: () => <div data-testid='loader'>Loading...</div>,
    async lazy() {
      const { BaseLayout } = await import('@/app/layout/BaseLayout');
      return { Component: BaseLayout };
    },
    children: [
      {
        path: '/offer/:id',
        async lazy() {
          const { OfferPage } = await import('@/pages/Offer');
          return { Component: OfferPage };
        }
      },
      {
        path: '/favorites',
        loader: privateRouteLoader,
        async lazy() {
          const { FavoritesPage } = await import('@/pages/Favorites');
          return { Component: FavoritesPage };
        }
      }
    ]
  },
  {
    path: '/login',
    HydrateFallback: () => <div data-testid='loader'>Loading...</div>,
    children: [
      {
        index: true,
        loader: loginRouteLoader,
        async lazy() {
          const {LoginPage} = await import('@/pages/Login');
          return {Component: LoginPage};
        }
      }
    ],
  },
  {
    path: '*',
    HydrateFallback: () => <div data-testid='loader'>Loading...</div>,
    async lazy() {
      const { NotFoundPage } = await import('@/pages/NotFound');
      return { Component: NotFoundPage };
    }
  }
];

export default routes;
