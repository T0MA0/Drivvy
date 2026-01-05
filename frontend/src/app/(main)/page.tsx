import SearchBar from '@/components/searchbar/searchbar';
import Image from 'next/image';

export default function MainLayout(){
    return (
    <>
        {/* ====== Hero ====== */}
        {/*} ===== HERO SZEKCIÓ ===== */}
        <section className="hero">
            <div className="container hero__grid">
                <div className="search card">
                    <h1  className="text-[2rem] leading-[1.2]">Autóbérlés <br/> <span className="text-[#d6dae3]">Győrben</span></h1>
                    <SearchBar/>
                </div>
                <div className="hero__copy">
                    <h2>Győri Drivvy – Szabadság és lehetőség négy keréken!</h2>
                    <ul className="lead">
                        <li>Nincs autód, de kellene egy napra? Vagy gyorsan átruccannál a város másik felére?</li>
                        <li>Bérelj autót egyszerűen, gyorsan, rugalmasan a mobilodról!</li>
                        <li>Saját autód van? Add meg másoknak is a vezetés élményét – közben szerezz plusz bevételt!</li>
                        <li>Regisztrálj most, és tapasztald meg a közlekedés új szabadságát Győrben!</li>
                    </ul>
                </div>
            </div>
        </section>
        
        {/* ===== Ilyen egyszerű ===== */}
        <section className="steps" id="steps">
           <div className="container">
                <h3>Ilyen egyszerű!</h3>
                <ol className="steps__row" aria-label="Folyamat lépései">
                <li><span className="step__icon">👤</span><span>Regisztráció</span></li>
                <li className="arrow">→</li>
                <li><span className="step__icon">🔑</span><span>Egyeztetés</span></li>
                <li  className="arrow">→</li>
                <li><span className="step__icon">🚘</span><span>Átvétel</span></li>
                <li className="arrow">→</li>
                <li><span className="step__icon">✅</span><span>Használat</span></li>
                </ol>
            </div>
        </section>

        <section className="owner">
            <div className="container owner__grid">
                <div className="owner__content card">
                    <h3>Engedd, hogy az autód dolgozzon helyetted!</h3>
                    <ul>
                    <li>Ingyenes és villámgyors indulás, pár perc alatt.</li>
                    <li>Csak töltsd fel az autód adatait és néhány fotót.</li>
                    <li>Biztonságos, gondtalan bérbeadás – rejtett költségek nélkül.</li>
                    <li>Te csak tartsd jó állapotban a járművet, a foglalást rugalmasan kezelheted.</li>
                    </ul>
                </div>
                <div className="owner__image">
                </div>
            </div>
        </section>
        {/* ===== MIÉRT NÁLUNK? ===== */}
        <section className="why">
            <div className="container why__grid">
                <div className="why__block card">
                    <h3>Miért érdemes nálunk autót bérelni?</h3>
                    <p><strong>Gyors és díjmentes regisztráció.</strong> Néhány perc alatt elvégezhető, utána szabadon böngészhetsz a neked megfelelő autók között.</p>
                    <p><strong>Rugalmas feltételek, korlátok nélkül.</strong> Sok esetben kaució nélkül is megoldható, kilométerkorlátozás sincs.</p>
                </div>
                <div className="why__image --left"></div>
            </div>
        </section>

        {/* === ROLUNK === */}
        <section className="about" id="about-us">
            <div className="about__grid container">
                <div className="card about__content">
                    <h2>Miért pont a Drivvy?</h2>
                    <p className="about__lead">
                        A Drivvy-nál hiszünk abban, hogy a városi mobilitásnak rugalmasabbnak, fenntarthatóbbnak és hatékonyabbnak kell lennie. Létrehoztuk a Drivvy-t azzal a céllal, hogy összekössük azokat az autótulajdonosokat, akik megosztanák járművüket, azokkal, akiknek csak alkalmankénti utazáshoz van szükségük autóra.
                    </p>

                    <div className="about__mission">
                        <h4>Kölcsönös előnyök</h4>
                        <p>Az autótulajdonosok extra bevételre tehetnek szert, amikor nem használják a kocsijukat. A bérlők pedig gyorsan, kényelmesen és gyakran olcsóbban juthatnak autóhoz, rugalmas feltételekkel.</p>
                        
                        <h4>Átláthatóság és biztonság</h4>
                        <p>A bérlők részletes és megbízható információkat kapnak az elérhető autókról, az árakról és a bérlés pontos feltételeiről. Platformunk célja, hogy a teljes folyamat a kereséstől a foglalásig gyors és zökkenőmentes legyen.</p>
                    </div>

                    <div className="about__cta">
                        <h3>Célunk</h3>
                        <p>A Drivvy víziója egy olyan jövő, ahol az autóbirtoklás helyett a használat áll a fókuszban. Egy olyan rendszert építünk, amely a közösség erejét kihasználva kínál kényelmes, gazdaságos és környezettudatos alternatívát a személyes mobilitásra.</p>
                        <p><strong>Csatlakozz a Drivvy közösséghez</strong> – akár bérbe adnál, akár bérelnél – és segíts nekünk abban, hogy a városi élet mindenki számára élhetőbb és szabadabb legyen!</p>
                    </div>
                    </div>
                <div className="about__image">
                    <Image 
                        src="/Rolunk_kep.jpg"
                        alt="Drivvy közösségi autómegosztás illusztrációja"
                        width={500}
                        height={500}
                        className="about__img"/>
                </div>
            </div>
        </section>
        {/* ===== HOGYAN MŰKÖDIK ===== */}
        <section className="how_it_works" id="how-it-works">
            <div className="container">
                <h2>Hogyan működik a Drivvy?</h2>
                <p className="how_it_works__desc">
                    A Drivvy segítségével egyszerűen bérelhetsz autót magánszemélyektől, vagy akár ki is adhatod
                    a saját autódat, ha épp nincs rá szükséged. Néhány lépésben már indulhatsz is:
                </p>
                <div className="how_it_works__grid">
                    <div className="how_it_works__card">
                        <span className="step_icon">🔎</span>
                        <h4>Keress autót a közeledben</h4>
                        <p>Add meg a helyszínt és az időpontot, és böngéssz a környékeden elérhető járművek között. Találd meg azt, ami legjobban illik az utadhoz.</p>
                    </div>
                    <div className="how_it_works__card">
                        <span className="step_icon">📝</span>
                        <h4>Foglalj gyorsan és biztonságosan</h4>
                        <p>Válaszd ki az autót, nézd meg a részleteket, majd küldd el a foglalási kérelmet. A tulajdonos visszaigazolása után már készülhetsz is az átvételre.</p>
                    </div>
                    <div className="how_it_works__card">
                        <span className="step_icon">👍</span>
                        <h4>Add vissza és értékeld a tapasztalatot</h4>
                        <p>A bérlés végén add vissza az autót ugyanabban az állapotban, ahogy átvetted. Értékeld a tulajdonost és az autót, hogy mások is tudjanak tájékozódni.</p>
                    </div>
                    <div className="how_it_works__card">
                        <span className="step_icon">🔑</span>
                        <h4>Vedd át az autót</h4>
                        <p>Találkozz a tulajdonossal az egyeztetett helyen, ellenőrizd az autót, és indulhat a kaland! A bérlés időtartama alatt a jármű a te kezedben van.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* ===== FOLYAMAT LEÍRÁS ===== */}
        <section className="process">
            <div className="container">
                <div className="card process__card">
                    <h3>Egyszerű és átlátható folyamat</h3>
                    <p>Felejtsd el a bonyolult, jogi zsargonnal teli szerződéseket! A regisztráció és a bérlés menete világos és letisztult. A Check‑in és Check‑out lépések garantálják, hogy mindenki elégedett legyen.</p>
                </div>
            </div>
        </section>
    </>
    )
}