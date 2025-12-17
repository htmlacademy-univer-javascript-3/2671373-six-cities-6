import {createApi} from '@/shared/services';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {State} from '@/shared/types';
import {Action} from '@reduxjs/toolkit';
import {AppThunkDispatch, extractActionsTypes, makeFakeComment} from '@/shared/utils/mocks.ts';
import {apiRoute} from '@/shared/constants';
import {getComments} from '@/shared/store';

describe('Comment async actions', () => {
  const axios = createApi();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator();
  });

  describe('getCommentsAction', () => {
    it('should dispatch "getComments.pending", "getComments.fulfilled", when server responds 200', async () => {
      const mockComments = [makeFakeComment(), makeFakeComment()];
      mockAxiosAdapter.onGet(`${apiRoute.comments}/1`).reply(200, mockComments);

      await store.dispatch(getComments('1'));

      const emittedActions = store.getActions();
      const extractedActionTypes = extractActionsTypes(emittedActions);
      const getCommentsFulfilled = emittedActions.at(1) as ReturnType<typeof getComments.fulfilled>;

      expect(extractedActionTypes).toEqual([
        getComments.pending.type,
        getComments.fulfilled.type,
      ]);

      expect(getCommentsFulfilled.payload).toEqual(mockComments);
    });

    it('should dispatch "getComments.pending", "getComments.rejected", when server responds 400', async () => {
      mockAxiosAdapter.onGet(`${apiRoute.comments}/1`).reply(400, []);

      await store.dispatch(getComments('1'));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        getComments.pending.type,
        getComments.rejected.type,
      ]);
    });
  });
});
