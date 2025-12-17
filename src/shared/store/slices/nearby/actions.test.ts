import {createApi} from '@/shared/services';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {State} from '@/shared/types';
import {Action} from '@reduxjs/toolkit';
import {AppThunkDispatch, extractActionsTypes, makeFakeOffer} from '@/shared/utils/mocks.ts';
import {apiRoute} from '@/shared/constants';
import { getNearOffers } from './actions';

describe('Nearby offers async actions', () => {
  const axios = createApi();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator();
  });

  describe('getNearOffers', () => {
    it('should dispatch "getNearOffers.pending", "getNearOffers.fulfilled", when server responds 200', async () => {
      const mockOffers = [makeFakeOffer(), makeFakeOffer()];
      mockAxiosAdapter.onGet(`${apiRoute.offers}/1/nearby`).reply(200, mockOffers);

      await store.dispatch(getNearOffers('1'));

      const emittedActions = store.getActions();
      const extractedActionTypes = extractActionsTypes(emittedActions);
      const getNearOffersFulfilled = emittedActions.at(1) as ReturnType<typeof getNearOffers.fulfilled>;

      expect(extractedActionTypes).toEqual([
        getNearOffers.pending.type,
        getNearOffers.fulfilled.type,
      ]);

      expect(getNearOffersFulfilled.payload).toEqual(mockOffers);
    });

    it('should dispatch "getNearOffers.pending", "getNearOffers.rejected", when server responds 400', async () => {
      mockAxiosAdapter.onGet(`${apiRoute.offers}/1/nearby`).reply(400, []);

      await store.dispatch(getNearOffers('1'));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        getNearOffers.pending.type,
        getNearOffers.rejected.type,
      ]);
    });
  });
});
