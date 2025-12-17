import { offersSlice, getOffersList } from './offers';

describe('Offers Slice', () => {
  it('Should return the initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {offers: {}, isLoading: false};

    const result = offersSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('Should return the default initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {offers: {}, isLoading: false};

    const result = offersSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('Should loading stop with "getOffersList.fulfilled"', () => {
    const initialState = {isLoading: true, offers: {}};
    const expectedState = {isLoading: false, offers: {}};

    const result = offersSlice.reducer(initialState, getOffersList.fulfilled);

    expect(result).toEqual(expectedState);
  });

  it('Should loading start with "getOffersList.pending"', () => {
    const initialState = {isLoading: false, offers: {}};
    const expectedState = {isLoading: true, offers: {}};

    const result = offersSlice.reducer(initialState, getOffersList.pending);

    expect(result).toEqual(expectedState);
  });

  it('Should loading start with "getOffersList.rejected"', () => {
    const initialState = {isLoading: true, offers: {}};
    const expectedState = {isLoading: false, offers: {}};

    const result = offersSlice.reducer(initialState, getOffersList.rejected);

    expect(result).toEqual(expectedState);
  });
});
