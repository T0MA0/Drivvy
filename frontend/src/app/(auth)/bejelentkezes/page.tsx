"use client";

import Link from "next/link";
import style from "./page.module.css";
import { useLogin } from "@/hooks/useBelepes";
import { Suspense } from "react"; 
import { useSearchParams } from "next/navigation";

function LoginContent() {
    const searchParams = useSearchParams(); 

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
                
                {/* HIBAÜZENET MEGJELENÍTÉSE */}
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
                            name="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            required  
                            placeholder="Email"
                        />
                    </div>

                    <div className={style.form_group}>
                        <label htmlFor="jelszo">Jelszó</label>
                        <input 
                            type="password" 
                            id="jelszo" 
                            name="password" 
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••" 
                            required 
                        />
                    </div>

                    <button 
                        type="submit" 
                        className={style.login_button}
                        disabled={loading} 
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

export default function LoginPage() {
    return (
        <Suspense fallback={<div className="text-white text-center p-10">Betöltés...</div>}>
            <LoginContent />
        </Suspense>
    );
}