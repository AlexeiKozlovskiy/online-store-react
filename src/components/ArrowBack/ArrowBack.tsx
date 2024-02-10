import './ArrowBack.scss';
import { useNavigate } from 'react-router-dom';

export function ArrowBack() {
  const navigate = useNavigate();

  return <button className="arrow-back" onClick={() => navigate(-1)}></button>;
}
