import { Route, Routes, useLocation } from 'react-router-dom';
import { Page404 } from '@/pages/Page404/Page404';
import { MainPage } from '@/pages/MainPage/MainPage';
import { CartPage } from '@/pages/CartPage/CartPage';
import { Header } from '@/components/Header/Header';
import { ProductPage } from '@/pages/ProductPage/ProductPage';
import { ProfilePage } from '@/pages/ProfilePage/ProfilePage';
import { ROUTE } from '@/types/types';

export const App = () => {
  const location = useLocation();
  const productName = location.pathname.replace('/product/', '');

  const Router = () => (
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
        <Router />
      </div>
    </div>
  );
};

export default App;
