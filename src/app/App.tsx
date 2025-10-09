import {FC} from 'react';
import { MainPage } from '@/pages/Main';

const App: FC<{placesCount: number}> = ({placesCount}) => (
  <MainPage placesCount={placesCount}/>
);

export default App;

