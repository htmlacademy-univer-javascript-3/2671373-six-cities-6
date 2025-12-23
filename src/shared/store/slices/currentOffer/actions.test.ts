import {createApi} from '@/shared/services';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {State} from '@/shared/types';
import {Action} from '@reduxjs/toolkit';
import {AppThunkDispatch, extractActionsTypes, makeFakeOfferCard} from '@/shared/utils/mocks.ts';
import {getOfferById} from './actions';
import {apiRoute} from '@/shared/constants';

describe('CurrentOffer async actions', () => {
  const axios = createApi();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator();
  });

  describe('getOfferById', () => {
    it('should dispatch "getOfferById.pending", "getOfferById.fulfilled", when server responds 200', async () => {
      const mockOfferCard = makeFakeOfferCard();
      mockAxiosAdapter.onGet(`${apiRoute.offers}/1`).reply(200, mockOfferCard);

      await store.dispatch(getOfferById('1'));

      const emittedActions = store.getActions();
      const extractedActionTypes = extractActionsTypes(emittedActions);
      const getOfferByIdFulfilled = emittedActions.at(1) as ReturnType<typeof getOfferById.fulfilled>;

      expect(extractedActionTypes).toEqual([
        getOfferById.pending.type,
        getOfferById.fulfilled.type,
      ]);

      expect(getOfferByIdFulfilled.payload).toEqual(mockOfferCard);
    });

    it('should dispatch "getOfferById.pending", "getOfferById.rejected", when server responds 400', async () => {
      mockAxiosAdapter.onGet(`${apiRoute.offers}/1`).reply(400, []);

      await store.dispatch(getOfferById('1'));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        getOfferById.pending.type,
        getOfferById.rejected.type,
      ]);
    });
  });
});
