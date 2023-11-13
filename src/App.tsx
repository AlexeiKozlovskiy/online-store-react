import { Route, Routes } from 'react-router-dom';
import { Page404 } from '@/pages/Page404/Page404';
import { MainPage } from '@/pages/MainPage/MainPage';
import { CartPage } from '@/pages/CartPage/CartPage';
import { Header } from '@/components/Header/Header';
import { ProductPage } from '@/pages/ProductPage/ProductPage';
import { useMyURLContext } from '@/context/URLContext';
import { ProfilePage } from '@/pages/ProfilePage/ProfilePage';

function App() {
  const { productNameFromURL } = useMyURLContext();

  return (
    <div className="App wrapper">
      <Header />
      <div className="appContent">
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="cart" element={<CartPage />}></Route>
          <Route path={`/product/${productNameFromURL}`} element={<ProductPage />}></Route>
          <Route path="profile" element={<ProfilePage />}></Route>
          <Route path="*" element={<Page404 />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
