import {createApi} from '@/shared/services';
import thunk from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {State} from '@/shared/types';
import {Action} from '@reduxjs/toolkit';
import {AppThunkDispatch} from '@/shared/utils/mocks.ts';
import MockAdapter from 'axios-mock-adapter';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

export const withStore = (component: JSX.Element, initialState?: Partial<State>) => {
  const axios = createApi();
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  const mockAxiosAdapter = new MockAdapter(axios);
  const mockStore = mockStoreCreator(initialState);

  return {
    component: <Provider store={mockStore}>{component}</Provider>,
    mockAxiosAdapter,
    mockStore
  };
};

export const withRouter = (component: JSX.Element) => ({
  component: (
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
});
