import {FC} from 'react';
import {Router} from '@/app/router';
import {Provider} from 'react-redux';
import { rootStore } from '@/shared/store';

const App: FC = () => (
  <Provider store={rootStore}>
    <Router/>
  </Provider>
);

export default App;

