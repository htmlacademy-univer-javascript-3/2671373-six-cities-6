import {currentOfferSlice} from './currentOffer';
import { getOfferById } from './actions';

describe('CurrentOffer Slice', () => {
  it('Should return the initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {isLoading: false};

    const result = currentOfferSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('Should return the default initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = { isLoading: false };

    const result = currentOfferSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('Should loading start with "getOfferById.pending"', () => {
    const initialState = {isLoading: false};
    const expectedState = {isLoading: true};

    const result = currentOfferSlice.reducer(initialState, getOfferById.pending);

    expect(result).toEqual(expectedState);
  });

  it('Should loading stop with "getOfferById.fulfilled"', () => {
    const initialState = {isLoading: true};
    const expectedState = {isLoading: false};

    const result = currentOfferSlice.reducer(initialState, getOfferById.fulfilled);

    expect(result).toEqual(expectedState);
  });

  it('Should loading stop with "getOfferById.rejected"', () => {
    const initialState = {isLoading: true};
    const expectedState = {isLoading: false};

    const result = currentOfferSlice.reducer(initialState, getOfferById.rejected);

    expect(result).toEqual(expectedState);
  });
});
