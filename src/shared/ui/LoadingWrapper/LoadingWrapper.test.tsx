import {render, screen} from '@testing-library/react';
import LoadingWrapper from './LoadingWrapper';

describe('shared: LoadingWrapper', () => {
  it('should render loader when loading is on', () => {
    const {rerender} = render(<LoadingWrapper isLoading/>);

    expect(screen.getByTestId('loading-wrapper')).toBeInTheDocument();

    rerender(<LoadingWrapper isLoading={false}/>);

    expect(screen.queryByTestId('loading-wrapper')).not.toBeInTheDocument();
  });
});
