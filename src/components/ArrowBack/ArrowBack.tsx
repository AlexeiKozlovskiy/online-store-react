import { memo } from 'react';
import './ArrowBack.scss';
import { useNavigate } from 'react-router-dom';

export const ArrowBack = memo(function ArrowBack() {
  const navigate = useNavigate();

  return <button className="arrow-back" onClick={() => navigate(-1)}></button>;
});
