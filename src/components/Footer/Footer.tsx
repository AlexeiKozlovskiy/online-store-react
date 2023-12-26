import './Footer.scss';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container wrapper">
        <div className="footer__github">
          <a className="github-link" href="https://github.com/AlexeiKozlovskiy">
            <span className="github-link__img"></span>
            <span className="github-link__person">Alexei Kozlovskiy</span>
          </a>
        </div>
        <div className="footer-task">Online Store 2024</div>
      </div>
    </footer>
  );
}
