import routes from '@/app/router/routes.tsx';
import {createMemoryRouter, InitialEntry, RouterProvider} from 'react-router-dom';
import {FC} from 'react';

export const MockMemoryRouter: FC<{initialEntries?: InitialEntry[]}> = ({initialEntries}) => {

  const memoryRouter = createMemoryRouter(routes, {initialEntries});

  return <RouterProvider router={memoryRouter} />;
};
