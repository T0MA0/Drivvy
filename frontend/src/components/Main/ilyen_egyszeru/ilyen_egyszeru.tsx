import style from "./ilyen_egyszeru.module.css";


export default function IsThatSimple(){
    return (
        <section className={style.steps} id="steps">
           <div className="container">
                <h3>Ilyen egyszerű!</h3>
                <ol className={style.steps__row} aria-label="Folyamat lépései">
                <li><span className={style.step__icon}>👤</span><span>Regisztráció</span></li>
                <li className="arrow">→</li>
                <li><span className={style.step__icon}>🔑</span><span>Egyeztetés</span></li>
                <li  className="arrow">→</li>
                <li><span className={style.step__icon}>🚘</span><span>Átvétel</span></li>
                <li className="arrow">→</li>
                <li><span className={style.step__icon}>✅</span><span>Használat</span></li>
                </ol>
            </div>
        </section>
    )
}