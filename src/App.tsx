import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Page404 } from '@/pages/Page404/Page404';
import { MainPage } from '@/pages/MainPage/MainPage';
import { CartPage } from '@/pages/CartPage/CartPage';
import { Header } from '@/components/Header/Header';
import { ProductPage } from '@/pages/ProductPage/ProductPage';
import { useMyIdContext } from '@/components/Context/ClickIDContext';
import products from '@/assets/data/products.json';

function App() {
  const { clickId } = useMyIdContext();
  const [id, setId] = useState<number>(0);

  useEffect(() => {
    loadProductRoute();
  }, [clickId]);

  const loadProductRoute = () => {
    const url = location.pathname;
    const routeId = +url
      .split('/')
      .map((el, ind, arr) => (el === 'product' ? arr[ind + 1] : ''))
      .join('');
    if (routeId <= products.length) {
      setId(routeId);
    }
  };

  return (
    <div className="App wrapper">
      <Header />
      <div className="appContent">
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="*" element={<Page404 />}></Route>
          <Route path="cart" element={<CartPage />}></Route>
          <Route path={`/product/${id}`} element={<ProductPage clickId={id} />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
