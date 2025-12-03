import Link from "next/link";

export default function PassReset(){
    return (
        <div className="auth-box">
            <div className="header">
                <h2>Jelszó visszaállítása</h2>
            </div>
            
            <p className="instruction">
                Add meg az e-mail címedet, amivel regisztráltál. Küldünk egy linket a jelszavad visszaállításához.
            </p>

            <form action="#" method="POST"> 
                <div className="form-group">
                    <label htmlFor="email">E-mail cím</label>
                    <input type="email" id="email" name="email" required placeholder="valaki@pelda.hu" />
                </div>

                <button type="submit" className="auth-button">Link küldése</button>

                <Link href="/bejelentkezes" className="back-to-login">Vissza a bejelentkezéshez</Link>
            </form>
        </div>
    )
}