import {authSlice} from './auth';
import {checkAuth, login, logout} from './actions';

describe('Auth Slice', () => {
  it('Should return the initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {isLoading: false, authorizationStatus: false};

    const result = authSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('Should return the default initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {isLoading: false, authorizationStatus: false};

    const result = authSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('Should set auth and loading on "login.fulfilled"', () => {
    const initialState = {isLoading: true, authorizationStatus: false};
    const expectedState = {isLoading: false, authorizationStatus: true};

    const result = authSlice.reducer(initialState, login.fulfilled);

    expect(result).toEqual(expectedState);
  });
  it('Should set loading on "login.pending"', () => {
    const initialState = {isLoading: false, authorizationStatus: false};
    const expectedState = {isLoading: true, authorizationStatus: false};

    const result = authSlice.reducer(initialState, login.pending);

    expect(result).toEqual(expectedState);
  });
  it('Should set auth and loading on "login.rejected"', () => {
    const initialState = {isLoading: true, authorizationStatus: true};
    const expectedState = {isLoading: false, authorizationStatus: false};

    const result = authSlice.reducer(initialState, login.rejected);

    expect(result).toEqual(expectedState);
  });
  it('Should set auth and loading on "checkAuth.fulfilled"', () => {
    const initialState = {isLoading: true, authorizationStatus: false};
    const expectedState = {isLoading: false, authorizationStatus: true};

    const result = authSlice.reducer(initialState, checkAuth.fulfilled);

    expect(result).toEqual(expectedState);
  });
  it('Should set loading on "checkAuth.pending"', () => {
    const initialState = {isLoading: false, authorizationStatus: false};
    const expectedState = {isLoading: true, authorizationStatus: false};

    const result = authSlice.reducer(initialState, checkAuth.pending);

    expect(result).toEqual(expectedState);
  });
  it('Should set auth and loading on "checkAuth.rejected"', () => {
    const initialState = {isLoading: true, authorizationStatus: true};
    const expectedState = {isLoading: false, authorizationStatus: false};

    const result = authSlice.reducer(initialState, checkAuth.rejected);

    expect(result).toEqual(expectedState);
  });
  it('Should set auth and loading on "logout.fulfilled"', () => {
    const initialState = {isLoading: true, authorizationStatus: true};
    const expectedState = {isLoading: false, authorizationStatus: false};

    const result = authSlice.reducer(initialState, logout.fulfilled);

    expect(result).toEqual(expectedState);
  });
  it('Should set loading on "logout.pending"', () => {
    const initialState = {isLoading: false, authorizationStatus: true};
    const expectedState = {isLoading: true, authorizationStatus: true};

    const result = authSlice.reducer(initialState, logout.pending);

    expect(result).toEqual(expectedState);
  });
  it('Should set auth and loading on "logout.rejected"', () => {
    const initialState = {isLoading: true, authorizationStatus: true};
    const expectedState = {isLoading: false, authorizationStatus: true};

    const result = authSlice.reducer(initialState, logout.rejected);

    expect(result).toEqual(expectedState);
  });
});
