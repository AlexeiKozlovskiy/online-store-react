import { Route, Routes } from 'react-router-dom';
import { Page404 } from './pages/Page404/Page404';
import { MainPage } from './pages/MainPage/MainPage';
import { CartPage } from './pages/CartPage/CartPage';
import { Header } from './components/Header/Header';

function App() {
  return (
    <div className="App wrapper">
      <Header />
      <div className="appContent">
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="*" element={<Page404 />}></Route>
          <Route path="cart" element={<CartPage />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
