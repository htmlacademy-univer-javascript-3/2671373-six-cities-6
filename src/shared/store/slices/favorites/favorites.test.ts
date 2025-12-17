import { favoritesSlice, getFavoriteOffersList } from './favorites';

describe('Favorites Slice', () => {
  it('Should return the initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {favorites: {}, isLoading: false};

    const result = favoritesSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('Should return the default initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {favorites: {}, isLoading: false};

    const result = favoritesSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('Should loading stop with "getFavoriteOffersList.fulfilled"', () => {
    const initialState = {isLoading: true, favorites: {}};
    const expectedState = {isLoading: false, favorites: {}};

    const result = favoritesSlice.reducer(initialState, getFavoriteOffersList.fulfilled);

    expect(result).toEqual(expectedState);
  });

  it('Should loading start with "getFavoriteOffersList.pending"', () => {
    const initialState = {isLoading: false, favorites: {}};
    const expectedState = {isLoading: true, favorites: {}};

    const result = favoritesSlice.reducer(initialState, getFavoriteOffersList.pending);

    expect(result).toEqual(expectedState);
  });

  it('Should loading start with "getFavoriteOffersList.rejected"', () => {
    const initialState = {isLoading: true, favorites: {}};
    const expectedState = {isLoading: false, favorites: {}};

    const result = favoritesSlice.reducer(initialState, getFavoriteOffersList.rejected);

    expect(result).toEqual(expectedState);
  });
});
