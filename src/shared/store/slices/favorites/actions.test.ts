import {createApi} from '@/shared/services';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {State} from '@/shared/types';
import {Action} from '@reduxjs/toolkit';
import {AppThunkDispatch, extractActionsTypes, makeFakeOffer} from '@/shared/utils/mocks.ts';
import {apiRoute} from '@/shared/constants';
import { getFavoriteOffersList } from './actions';

describe('Favorites async actions', () => {
  const axios = createApi();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator();
  });

  describe('getFavoriteOffersList', () => {
    it('should dispatch "getFavoriteOffersList.pending", "getFavoriteOffersList.fulfilled", when server responds 200', async () => {
      const mockOffers = [makeFakeOffer(), makeFakeOffer()];
      mockAxiosAdapter.onGet(`${apiRoute.favorite}`).reply(200, mockOffers);

      await store.dispatch(getFavoriteOffersList());

      const emittedActions = store.getActions();
      const extractedActionTypes = extractActionsTypes(emittedActions);

      expect(extractedActionTypes).toEqual([
        getFavoriteOffersList.pending.type,
        getFavoriteOffersList.fulfilled.type,
      ]);
    });

    it('should dispatch "getFavoriteOffersList.pending", "getFavoriteOffersList.rejected", when server responds 400', async () => {
      mockAxiosAdapter.onGet(`${apiRoute.favorite}`).reply(400, []);

      await store.dispatch(getFavoriteOffersList());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        getFavoriteOffersList.pending.type,
        getFavoriteOffersList.rejected.type,
      ]);
    });
  });
});
