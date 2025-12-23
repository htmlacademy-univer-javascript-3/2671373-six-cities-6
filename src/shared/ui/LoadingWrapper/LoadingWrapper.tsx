import {FC, PropsWithChildren} from 'react';
import {ClipLoader} from 'react-spinners';

interface ILoadingWrapper {
  isLoading: boolean;
}

const LoadingWrapper: FC<PropsWithChildren<ILoadingWrapper>> = (props) => {

  const {isLoading, children} = props;

  if (isLoading) {
    return (
      <ClipLoader
        data-testid="loading-wrapper"
        cssOverride={{margin: '0 auto'}}
        loading
        size={150}
      />
    );
  }

  return children;
};

export default LoadingWrapper;
