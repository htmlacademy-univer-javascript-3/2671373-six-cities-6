import {createApi} from '@/shared/services';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {State} from '@/shared/types';
import {Action} from '@reduxjs/toolkit';
import {AppThunkDispatch, extractActionsTypes, makeFakeOffer} from '@/shared/utils/mocks.ts';
import {apiRoute} from '@/shared/constants';
import { getOffersList } from './actions';

describe('Offers async actions', () => {
  const axios = createApi();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator();
  });

  describe('getOffersList', () => {
    it('should dispatch "getOffersList.pending", "getOffersList.fulfilled", when server responds 200', async () => {
      const mockOffers = [makeFakeOffer(), makeFakeOffer()];
      mockAxiosAdapter.onGet(`${apiRoute.offers}`).reply(200, mockOffers);

      await store.dispatch(getOffersList());

      const emittedActions = store.getActions();
      const extractedActionTypes = extractActionsTypes(emittedActions);

      expect(extractedActionTypes).toEqual([
        getOffersList.pending.type,
        getOffersList.fulfilled.type,
      ]);
    });

    it('should dispatch "getOffersList.pending", "getOffersList.rejected", when server responds 400', async () => {
      mockAxiosAdapter.onGet(`${apiRoute.offers}`).reply(400, []);

      await store.dispatch(getOffersList());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        getOffersList.pending.type,
        getOffersList.rejected.type,
      ]);
    });
  });
});
