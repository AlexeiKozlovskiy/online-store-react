import { Route, Routes, useLocation } from 'react-router-dom';
import { Page404 } from '@/pages/Page404/Page404';
import { MainPage } from '@/pages/MainPage/MainPage';
import { CartPage } from '@/pages/CartPage/CartPage';
import { Header } from '@/components/Header/Header';
import { ProductPage } from '@/pages/ProductPage/ProductPage';
import { ProfilePage } from '@/pages/ProfilePage/ProfilePage';
import { Authentication, ROUTE, RootReducerProps } from '@/types/types';
import { Footer } from './components/Footer/Footer';
import { useSelector } from 'react-redux';
import { Client, Server } from 'react-hydration-provider';

export const App = () => {
  const location = useLocation();
  const productName = location.pathname.replace('/product/', '');
  const { authenticated } = useSelector<RootReducerProps, Authentication>((state) => state.auth);

  const RouterClient = () => (
    <Routes>
      <Route path={ROUTE.MAIN} element={<MainPage />} />
      <Route path={ROUTE.CART} element={<CartPage />} />
      <Route path={`${ROUTE.PRODUCT}/${productName}`} element={<ProductPage />} />
      {authenticated && <Route path={ROUTE.PROFILE} element={<ProfilePage />} />}
      <Route path="*" element={<Page404 />} />
    </Routes>
  );

  const RouterServer = () => (
    <Routes>
      <Route path={ROUTE.MAIN} element={<MainPage />} />
      <Route path={ROUTE.CART} element={<CartPage />} />
      <Route path={`${ROUTE.PRODUCT}/${productName}`} element={<ProductPage />} />
      <Route path={ROUTE.PROFILE} element={<ProfilePage />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );

  return (
    <div className="App wrapper">
      <Header />
      <div className="appContent">
        <Client>
          <RouterClient />
        </Client>
        <Server>
          <RouterServer />
        </Server>
      </div>
      <Footer />
    </div>
  );
};

export default App;
