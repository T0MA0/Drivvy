import style from "./hogymukodik.module.css"

export default function HowItWork(){
    return(
        <section className={style.how_it_works} id="how-it-works">
            <div className="container">
                <h2>Hogyan működik a Drivvy?</h2>
                <p className={style.how_it_works__desc}>
                    A Drivvy segítségével egyszerűen bérelhetsz autót magánszemélyektől, vagy akár ki is adhatod
                    a saját autódat, ha épp nincs rá szükséged. Néhány lépésben már indulhatsz is:
                </p>
                <div className={style.how_it_works__grid}>
                    <div className={style.how_it_works__card}>
                        <span className={style.step_icon}>🔎</span>
                        <h4>Keress autót a közeledben</h4>
                        <p>Add meg a helyszínt és az időpontot, és böngéssz a környékeden elérhető járművek között. Találd meg azt, ami legjobban illik az utadhoz.</p>
                    </div>
                    <div className={style.how_it_works__card}>
                        <span className={style.step_icon}>📝</span>
                        <h4>Foglalj gyorsan és biztonságosan</h4>
                        <p>Válaszd ki az autót, nézd meg a részleteket, majd küldd el a foglalási kérelmet. A tulajdonos visszaigazolása után már készülhetsz is az átvételre.</p>
                    </div>
                    <div className={style.how_it_works__card}>
                        <span className={style.step_icon}>👍</span>
                        <h4>Add vissza és értékeld a tapasztalatot</h4>
                        <p>A bérlés végén add vissza az autót ugyanabban az állapotban, ahogy átvetted. Értékeld a tulajdonost és az autót, hogy mások is tudjanak tájékozódni.</p>
                    </div>
                    <div className={style.how_it_works__card}>
                        <span className={style.step_icon}>🔑</span>
                        <h4>Vedd át az autót</h4>
                        <p>Találkozz a tulajdonossal az egyeztetett helyen, ellenőrizd az autót, és indulhat a kaland! A bérlés időtartama alatt a jármű a te kezedben van.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}