import { Route, Routes } from 'react-router-dom';
import Page404 from './pages/Page404';
import MainPage from './pages/MainPage';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="appContent">
        <Routes>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="*" element={<Page404 />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
