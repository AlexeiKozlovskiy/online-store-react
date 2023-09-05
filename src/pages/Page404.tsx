import { Link } from 'react-router-dom';

function Page404() {
  return (
    <div className="page404-container">
      <p className="page404-bigTxt">Whoops!</p>
      <p className="page404-mainTxt">Looks like you got lost.</p>
      <p className="page404-subTxt">
        Go back to the <Link to="/">home</Link> page?
      </p>
    </div>
  );
}

export default Page404;