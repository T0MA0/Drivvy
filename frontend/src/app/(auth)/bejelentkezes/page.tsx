"use client";

import Link from "next/link";
import style from "./page.module.css";
import { useLogin } from "@/hooks/useBelepes";

export default function LoginPage() {
    // Itt hívjuk meg a logikát, amit az előbb írtunk meg
    const { formData, error, loading, handleChange, onSubmit } = useLogin();

    return(
        <div className={style.login_wrapper}>
            <div className={style.login_box}>
                <div>
                    <Link href="/" className={style.close_btn} title="Vissza a főoldalra">
                        &times; 
                    </Link>   
                    <h2 className={style.header}>Bejelentkezés</h2>
                </div>
                
                {/* HIBAÜZENET MEGJELENÍTÉSE (Ha elrontotta a jelszót) */}
                {error && (
                    <p style={{color: '#ff4444', textAlign: 'center', marginBottom: '1rem', fontWeight: 'bold'}}>
                        {error}
                    </p>
                )}
                        
                <form onSubmit={onSubmit}> 
                    <div className={style.form_group}>
                        <label htmlFor="email">E-mail cím</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" // egyeznie kell a state nevével
                            value={formData.email} // Összekötjük a state-tel
                            onChange={handleChange} // Figyeljük a gépelést
                            required  
                            placeholder="Email"
                        />
                    </div>

                    <div className={style.form_group}>
                        <label htmlFor="jelszo">Jelszó</label>
                        <input 
                            type="password" 
                            id="jelszo" 
                            name="password" // Backend 'password'-öt vár (nem jelszo-t)
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••" 
                            required 
                        />
                    </div>

                    <button 
                        type="submit" 
                        className={style.login_button}
                        disabled={loading} // Letiltjuk, amíg tölt
                    >
                        {loading ? 'Belépés...' : 'Bejelentkezés'}
                    </button>

                    <Link href="/jelszoRecover" className={style.forgot_password}>
                        Elfelejtetted a jelszavad?
                    </Link>
                </form>
            </div>
        </div>
    )
}