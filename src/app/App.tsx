import {FC} from 'react';
import { MainPage } from '@/pages/Main';
// import {OfferNotLoggedPage} from '@/pages/OfferNotLogged';
// import {LoginPage} from '@/pages/Login';
// import {FavoritesPage} from '@/pages/Favorites';
// import {FavoritesEmpty} from '@/pages/FavoritesEmpty';
// import {OfferPage} from '@/pages/Offer';
// import {MainEmptyPage} from '@/pages/MainEmpty';

const App: FC<{placesCount: number}> = ({placesCount}) => (
  // <LoginPage/>
  // <FavoritesPage/>
  // <FavoritesEmpty/>
  // <OfferPage />
  // <OfferNotLoggedPage/>
  <MainPage placesCount={placesCount}/>
  // <MainEmptyPage/>
);

export default App;

