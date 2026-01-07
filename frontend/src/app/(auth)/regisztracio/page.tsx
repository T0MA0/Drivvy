"use client";

import { Suspense } from "react";
import Link from "next/link";
import style from "./page.module.css";
import { useRegister } from "@/hooks/useRegisztracio";
import { InputGroup } from "@/components/ui/regInput";


function RegisterContent() {
    const { 
        formData, error, loading, acceptedTerms, 
        handleChange, handleCheckbox, onSubmit 
    } = useRegister();

    return (
        <div className={style.reg_wrapper}>
            <div className={style.reg_box}>            
                <div className={style.header}>
                    <Link href="/" className={style.close_btn} title="Vissza a főoldalra">
                        &times; 
                    </Link>    
                    <h2>Regisztráció</h2>
                </div>
                
                {error && <p style={{color: '#ff4444', textAlign: 'center', marginBottom: '1rem'}}>{error}</p>}

                <form onSubmit={onSubmit}>
                    <InputGroup 
                        containerClass={style.form_group}
                        label="Keresztnév" id="keresztnev" name="first_name" 
                        placeholder="Keresztnév" value={formData.first_name} onChange={handleChange} 
                    />
                    <InputGroup 
                        containerClass={style.form_group}
                        label="Vezetéknév" id="vezeteknev" name="last_name" 
                        placeholder="Vezetéknév" value={formData.last_name} onChange={handleChange} 
                    />
                    <InputGroup 
                        containerClass={style.form_group}
                        label="E-mail cím" id="email" name="email" type="email"
                        placeholder="Email" value={formData.email} onChange={handleChange} 
                    />
                    <InputGroup 
                        containerClass={style.form_group}
                        label="Jelszó" id="jelszo" name="password" type="password"
                        placeholder="••••••••" value={formData.password} onChange={handleChange} 
                    />
                    <InputGroup 
                        containerClass={style.form_group}
                        label="Jelszó megerősítése" id="jelszo-megerosites" name="confirm_password" type="password"
                        placeholder="••••••••" value={formData.confirm_password} onChange={handleChange} 
                    />

                    <div className={style.checkbox_group}>
                        <div className={`${style.checkbox_item} ${style.master_checkbox_item}`}>
                            <input
                                type="checkbox"
                                id="mind-elfogad"
                                checked={acceptedTerms}
                                onChange={handleCheckbox}
                                className="mr-2 cursor-pointer"
                            />
                            <label htmlFor="mind-elfogad" className="cursor-pointer font-bold">Összes feltétel elfogadása</label>
                        </div>
                        <div className={style.checkbox_item}>
                            <input
                                type="checkbox"
                                id="aszf"
                                checked={acceptedTerms}
                                onChange={handleCheckbox}
                                className={style.child_checkbox}
                            />
                            <label htmlFor="aszf" className="mr-2 cursor-pointer">Az Általános Szerződési Feltételeket megismertem és elfogadom.</label>
                        </div>
                         <div className={style.checkbox_item}>
                            <input type="checkbox" id="hirlevel" className={style.child_checkbox} />
                            <label htmlFor="hirlevel">Hozzájárulok ahhoz, hogy ez az Adatkezelő hírlevelet küldjön részemre.</label>
                        </div>
                    </div>

                    <button type="submit" className={style.reg_button} disabled={loading}>
                        {loading ? 'Feldolgozás...' : 'Regisztráció'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default function RegPage() {
    return (
        <Suspense fallback={<div className="text-white text-center p-10">Betöltés...</div>}>
            <RegisterContent />
        </Suspense>
    );
}