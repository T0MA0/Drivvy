import RolunkComponent from '@/components/Main/rolunk/rolunk';
import SearchBar from '@/components/Main/searchbar/searchbar';
import HowItWork from '@/components/Main/hogymukodik/how_mukodik';
import IsThatSimple from '@/components/Main/ilyen_egyszeru/ilyen_egyszeru';

export default function MainLayout(){
    return (
    <>
        {/* ====== Hero ====== */}
        {/*} ===== HERO SZEKCIÓ (nyitó rész, háttérkép CSS-ből) ===== */}
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
        
        <IsThatSimple/>
        {/* ===== TULAJDONOSI AJÁNLÓ (autó kiadása) WORK IN PROGRESS A GUIHOZ IGAZÍTVA ===== */}
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
                    {/* Jobb oldali illusztráció: háttérkép a CSS-ben állítva*/}
                <div className="owner__image">
                    {/* kép csere a CSS-ben .owner__image */}
                </div>
            </div>
        </section>
        {/* ===== MIÉRT NÁLUNK? (értékajánlat + képek) ===== */}
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
        <RolunkComponent/>
        <HowItWork/>
        {/* ===== FOLYAMAT LEÍRÁS (összefoglaló doboz) ===== */}
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