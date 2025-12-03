import style from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={style.footer} id="kapcsolat">
      <div className={`container ${style.footer__grid}`}>
        <div>
          <h4>Kapcsolat</h4>
          <p>📞 +36 30 123 4567<br/>📞 +36 70 987 6543</p>
        </div>
        <div>
          <h4>Email</h4>
          <p><a href="mailto:info@drivvy.hu">info@drivvy.hu</a><br/><a href="mailto:support@drivvy.hu">support@drivvy.hu</a></p>
        </div>
        <div>
          <h4>Cím</h4>
          <p>1111 Győr, Fő utca 10.</p>
        </div>
      </div>
      <div className={style.footer__bar}>© 2025 Drivvy</div>
    </footer>
  );
};
