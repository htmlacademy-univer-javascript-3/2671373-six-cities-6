import {FC} from 'react';
import {Router} from '@/app/router';
import {Provider} from 'react-redux';
import { store } from '@/shared/store';

const App: FC = () => (
  <Provider store={store}>
    <Router/>
  </Provider>
);

export default App;

