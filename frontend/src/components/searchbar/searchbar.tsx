"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import style from "./searchbar.module.css";

export default function SearchBar() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [fromDate, setFromDate] = useState(searchParams.get("from") || "");
    const [toDate, setToDate] = useState(searchParams.get("to") || "");
    const [fromTime, setFromTime] = useState(searchParams.get("from_time") || "08:00");
    const [toTime, setToTime] = useState(searchParams.get("to_time") || "20:00");

    useEffect(() => {
        const f = searchParams.get("from");
        const t = searchParams.get("to");
        const h_f = searchParams.get("from_time");
        const h_t = searchParams.get("to_time");
        if (f) setFromDate(f);
        if (t) setToDate(t);
        if (h_f) setFromTime(h_f);
        if (h_t) setToTime(h_t);

    }, [searchParams]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();

        const params = new URLSearchParams();
        if (fromDate) params.append("from", fromDate);
        if (toDate) params.append("to", toDate);
        if (fromTime) params.append("from_time", fromTime);
        if (toTime) params.append("to_time", toTime);
        
        router.push(`/car?${params.toString()}`); 
    };

    return(
        <form className={style.search__form} onSubmit={handleSearch}>
            <label className={style.field}>
                <span>Mikortól?</span>
                <input 
                    type="date" 
                    id="from_date" 
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    required
                    className={style.input}
                />
            </label>

            <label className={style.field}>
                <span>Meddig?</span>
                <input 
                    type="date" 
                    id="to_date" 
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    required
                />
            </label>

            <label className={style.field}>
                <span>Hány órától?</span>
                <input 
                    type="time" 
                    id="from_time" 
                    value={fromTime} 
                    onChange={(e) => setFromTime(e.target.value)}
                />
            </label>

            <label className={style.field}>
                <span>Hány óráig?</span>
                <input 
                    type="time" 
                    id="to_time" 
                    value={toTime}
                    onChange={(e) => setToTime(e.target.value)}
                />
            </label>

            <button 
                type="submit" 
                className={`btn btn--xl btn--primary ${style.search__cta}`}
            >
                Keresés
            </button>
        </form>
    )
}