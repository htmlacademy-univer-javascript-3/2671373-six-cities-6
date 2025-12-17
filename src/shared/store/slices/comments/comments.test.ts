import {commentsSlice, getComments} from './comments.ts';

describe('Comments Slice', () => {
  it('Should return the initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {comments: [], isLoading: false};

    const result = commentsSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('Should return the default initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = { comments: [], isLoading: false };

    const result = commentsSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('Should loading stop with "getComments.fulfilled"', () => {
    const initialState = {isLoading: true, comments: []};
    const expectedState = {isLoading: false, comments: []};

    const result = commentsSlice.reducer(initialState, getComments.fulfilled);

    expect(result).toEqual(expectedState);
  });

  it('Should loading start with "getComments.pending"', () => {
    const initialState = {isLoading: false, comments: []};
    const expectedState = {isLoading: true, comments: []};

    const result = commentsSlice.reducer(initialState, getComments.pending);

    expect(result).toEqual(expectedState);
  });

  it('Should loading start with "getComments.rejected"', () => {
    const initialState = {isLoading: true, comments: []};
    const expectedState = {isLoading: false, comments: []};

    const result = commentsSlice.reducer(initialState, getComments.rejected);

    expect(result).toEqual(expectedState);
  });
});
