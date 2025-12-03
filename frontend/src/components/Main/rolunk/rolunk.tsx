import Image from "next/image"
import styles from "./rolunk.module.css"

export default function RolunkComponent(){
    return(    
        <section className={styles.about} id="about-us">
            <div className={`${styles.about__grid} container`}>
                <div className={`card ${styles.about__content}`}>
                    <h2>Miért pont a Drivvy?</h2>
                    <p className={styles.about__lead}>
                        A Drivvy-nál hiszünk abban, hogy a városi mobilitásnak rugalmasabbnak, fenntarthatóbbnak és hatékonyabbnak kell lennie. Létrehoztuk a Drivvy-t azzal a céllal, hogy összekössük azokat az autótulajdonosokat, akik megosztanák járművüket, azokkal, akiknek csak alkalmankénti utazáshoz van szükségük autóra.
                    </p>

                    <div className={styles.about__mission}>
                        <h4>Kölcsönös előnyök</h4>
                        <p>Az autótulajdonosok extra bevételre tehetnek szert, amikor nem használják a kocsijukat. A bérlők pedig gyorsan, kényelmesen és gyakran olcsóbban juthatnak autóhoz, rugalmas feltételekkel.</p>
                        
                        <h4>Átláthatóság és biztonság</h4>
                        <p>A bérlők részletes és megbízható információkat kapnak az elérhető autókról, az árakról és a bérlés pontos feltételeiről. Platformunk célja, hogy a teljes folyamat a kereséstől a foglalásig gyors és zökkenőmentes legyen.</p>
                    </div>

                    <div className={styles.about__cta}>
                        <h3>Célunk</h3>
                        <p>A Drivvy víziója egy olyan jövő, ahol az autóbirtoklás helyett a használat áll a fókuszban. Egy olyan rendszert építünk, amely a közösség erejét kihasználva kínál kényelmes, gazdaságos és környezettudatos alternatívát a személyes mobilitásra.</p>
                        <p><strong>Csatlakozz a Drivvy közösséghez</strong> – akár bérbe adnál, akár bérelnél – és segíts nekünk abban, hogy a városi élet mindenki számára élhetőbb és szabadabb legyen!</p>
                    </div>
                    </div>
                <div className={styles.about__image}>
                    <Image 
                        src="/Rolunk_kep.jpg"
                        alt="Drivvy közösségi autómegosztás illusztrációja"
                        width={500}
                        height={500}
                        className={styles.about__img}/>
                </div>
            </div>
        </section>
    )
}
