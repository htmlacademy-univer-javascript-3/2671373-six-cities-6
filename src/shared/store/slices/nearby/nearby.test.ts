import { nearbySlice } from './nearby';
import { getNearOffers } from './actions';

describe('Nearby Slice', () => {
  it('Should return the initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {offers: [], isLoading: false};

    const result = nearbySlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('Should return the default initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = { offers: [], isLoading: false };

    const result = nearbySlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('Should loading stop with "getNearOffers.fulfilled"', () => {
    const initialState = {isLoading: true, offers: []};
    const expectedState = {isLoading: false, offers: []};

    const result = nearbySlice.reducer(initialState, getNearOffers.fulfilled);

    expect(result).toEqual(expectedState);
  });

  it('Should loading start with "getNearOffers.pending"', () => {
    const initialState = {isLoading: false, offers: []};
    const expectedState = {isLoading: true, offers: []};

    const result = nearbySlice.reducer(initialState, getNearOffers.pending);

    expect(result).toEqual(expectedState);
  });

  it('Should loading start with "getNearOffers.rejected"', () => {
    const initialState = {isLoading: true, offers: []};
    const expectedState = {isLoading: false, offers: []};

    const result = nearbySlice.reducer(initialState, getNearOffers.rejected);

    expect(result).toEqual(expectedState);
  });
});
