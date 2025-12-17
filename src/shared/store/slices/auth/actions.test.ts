import {createApi} from '@/shared/services';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {State} from '@/shared/types';
import {Action} from '@reduxjs/toolkit';
import {AppThunkDispatch, extractActionsTypes} from '@/shared/utils/mocks';
import {checkAuth} from '@/shared/store';
import {apiRoute} from '@/shared/constants';

describe('Auth async actions', () => {
  const axios = createApi();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator();
  });

  describe('checkAuthAction', () => {
    it('should dispatch "checkAuth.pending" and "checkAuth.fulfilled" with thunk', async () => {
      mockAxiosAdapter.onGet(apiRoute.login).reply(200);

      await store.dispatch(checkAuth());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuth.pending.type,
        checkAuth.fulfilled.type,
      ]);
    });

    it('should dispatch "checkAuth.pending" and "checkAuth.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(apiRoute.login).reply(400);

      await store.dispatch(checkAuth());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuth.pending.type,
        checkAuth.rejected.type,
      ]);
    });
  });
});
