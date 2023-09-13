import './Page404.scss';
import { Link } from 'react-router-dom';

export function Page404() {
  return (
    <div className="page404__container wrapper">
      <p className="page404__bigTxt">Whoops!</p>
      <p className="page404__mainTxt">Looks like you got lost.</p>
      <p className="page404__subTxt">
        Go back to the <Link to="/">home</Link> page?
      </p>
    </div>
  );
}
