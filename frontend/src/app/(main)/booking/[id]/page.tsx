"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { getCarById } from "@/services/autoService";
import { createBooking } from "@/services/bookingService";

export default function BookingPage() {
    const params = useParams();
    const router = useRouter();
    
    // Állapotok
    const [car, setCar] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    // Űrlap adatok
    const [dates, setDates] = useState({ start: "", end: "" });
    const [paymentMethod, setPaymentMethod] = useState("card");
    
    // Számolt értékek
    const [totalDays, setTotalDays] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    // AUTÓ BETÖLTÉSE
    useEffect(() => {
        const loadCar = async () => {
            if (!params.id) return;
            try {
                const data = await getCarById(params.id as string);
                setCar(data);
            } catch (err) {
                setError("Nem sikerült betölteni az autó adatait.");
            } finally {
                setLoading(false);
            }
        };

        loadCar();
    }, [params.id]);

    // ÁRKALKULÁCIÓ
    useEffect(() => {
        if (dates.start && dates.end && car) {
            const start = new Date(dates.start);
            const end = new Date(dates.end);
            const diffTime = end.getTime() - start.getTime();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
            
            if (diffDays > 0) {
                setTotalDays(diffDays);
                setTotalPrice(diffDays * car.price_per_day);
            } else {
                setTotalDays(0);
                setTotalPrice(0);
            }
        }
    }, [dates, car]);

    // FOGLALÁS BEKÜLDÉSE
    const handleBooking = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSubmitting(true);

        if (totalDays <= 0) {
            alert("Kérlek válassz érvényes dátumokat!");
            setSubmitting(false);
            return;
        }

        try {
            await createBooking({
                car: car.id,
                start_date: dates.start,
                end_date: dates.end
            });

            alert("Sikeres foglalás! 🎉");
            router.push("/profile"); 

        } catch (err: any) {
            let errorMessage = "Hiba történt a foglalás során.";
            
            try {
                 const parsedError = JSON.parse(err.message);
                 
                 if (parsedError.non_field_errors) {
                     errorMessage = parsedError.non_field_errors[0];
                 } else if (parsedError.detail) {
                     errorMessage = parsedError.detail;
                 } else if (parsedError.start_date) {
                     errorMessage = `Dátum hiba: ${parsedError.start_date[0]}`;
                 } else {
                     errorMessage = Object.values(parsedError).flat().join(" ");
                 }
            } catch (e) {
                if (err.message) errorMessage = err.message;
            }
            
            if (errorMessage.includes("Nincs bejelentkezve") || errorMessage.includes("token")) {
                router.push("/login");
            } else {
                // Minden más hiba
                alert(`Hiba: ${errorMessage}`);
            }
        } finally {
            setSubmitting(false);
        }
    };


    if (loading) return <div className="min-h-screen bg-[#111] text-white flex items-center justify-center">Betöltés...</div>;

    return (
        <section className="min-h-screen relative py-12 flex justify-center bg-[#2b2b2b]">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.55),rgba(0,0,0,0.85)),url('/hatterkep.png')] bg-cover bg-center pointer-events-none"></div>
            <div className="container mx-auto px-4 relative z-10 max-w-7xl">
                <form onSubmit={handleBooking} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                    <div className="lg:col-span-2 bg-[#1b1e24] rounded-xl p-8 shadow-2xl border border-gray-800">
                        {/* Bérlés Időtartama */}
                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-green-500 mb-4">
                                Bérlés Időtartama
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Mikortól?</label>
                                    <div className="relative">
                                        <input 
                                            type="date" 
                                            required
                                            className="w-full bg-[#111] border border-gray-700 rounded-lg p-4 text-white focus:outline-none focus:border-green-500 transition-colors"
                                            onChange={(e) => setDates({...dates, start: e.target.value})}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Meddig?</label>
                                    <div className="relative">
                                        <input 
                                            type="date" 
                                            required
                                            className="w-full bg-[#111] border border-gray-700 rounded-lg p-4 text-white focus:outline-none focus:border-green-500 transition-colors"
                                            onChange={(e) => setDates({...dates, end: e.target.value})}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Számlázási Adatok */}
                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-green-500 mb-4">
                                Számlázási Adatok
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Vezetéknév *</label>
                                    <input type="text" className="w-full bg-[#111] border border-gray-700 rounded-lg p-4 text-white focus:outline-none focus:border-green-500" required />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Keresztnév *</label>
                                    <input type="text" className="w-full bg-[#111] border border-gray-700 rounded-lg p-4 text-white focus:outline-none focus:border-green-500" required />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Cím *</label>
                                <input type="text" className="w-full bg-[#111] border border-gray-700 rounded-lg p-4 text-white focus:outline-none focus:border-green-500" required />
                            </div>
                        </div>

                        {/* Fizetési Mód */}
                        <div>
                            <h2 className="text-xl font-bold text-green-500 mb-4">
                                Fizetési Mód
                            </h2>
                            
                            <div className="space-y-4 mb-6">
                                {/* Bankkártya Opció */}
                                <div className={`border rounded-lg transition-all overflow-hidden ${paymentMethod === 'card' ? 'border-green-500 bg-green-500/5' : 'border-gray-700 bg-[#111]'}`}>
                                    <label className="flex items-center p-4 cursor-pointer">
                                        <input 
                                            type="radio" name="payment" value="card" 
                                            checked={paymentMethod === 'card'}
                                            onChange={() => setPaymentMethod('card')}
                                            className="w-4 h-4 text-green-500 accent-green-500"
                                        />
                                        <span className="ml-3 font-medium text-white flex items-center gap-2">Bankkártyás fizetés</span>
                                    </label>
                                    
                                    {/* Lenyíló kártyaadatok */}
                                    {paymentMethod === 'card' && (
                                        <div className="p-4 pt-0 space-y-4 animate-fadeIn">
                                            <input type="text" placeholder="Kártyaszám * 0000 0000 0000 0000" className="w-full bg-[#1b1e24] border border-gray-700 rounded-lg p-4 text-white focus:outline-none focus:border-green-500" />
                                            <div className="grid grid-cols-2 gap-4">
                                                <input type="text" placeholder="Lejárati dátum * MM/YY" className="w-full bg-[#1b1e24] border border-gray-700 rounded-lg p-4 text-white focus:outline-none focus:border-green-500" />
                                                <input type="text" placeholder="CVC kód * 123" className="w-full bg-[#1b1e24] border border-gray-700 rounded-lg p-4 text-white focus:outline-none focus:border-green-500" />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Átutalás Opció */}
                                <div className={`border rounded-lg transition-all ${paymentMethod === 'transfer' ? 'border-green-500 bg-green-500/5' : 'border-gray-700 bg-[#111]'}`}>
                                    <label className="flex items-center p-4 cursor-pointer">
                                        <input 
                                            type="radio" name="payment" value="transfer" 
                                            checked={paymentMethod === 'transfer'}
                                            onChange={() => setPaymentMethod('transfer')}
                                            className="w-4 h-4 text-green-500 accent-green-500"
                                        />
                                        <span className="ml-3 font-medium text-white">Banki átutalás (előre)</span>
                                    </label>
                                </div>
                            </div>

                            {/* ZÖLD GOMB */}
                            <button type="submit" className="w-full bg-green-700 hover:bg-green-600 text-white font-bold py-4 rounded-lg text-lg shadow-lg transition-all mt-4">
                                Fizetés és Foglalás
                            </button>
                        </div>
                    </div>

                    {/* --- ÖSSZEFOGLALÓ KÁRTYA --- */}
                    <div className="lg:col-span-1">
                        <div className="bg-[#1b1e24] rounded-xl p-6 shadow-2xl border border-gray-800 sticky top-24">
                            <h3 className="text-xl font-bold text-green-500 mb-6 flex items-center gap-2 pb-4 border-b border-gray-700">
                                🚗 Foglalás Összefoglaló
                            </h3>

                            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                                A költségek a választott dátumok alapján frissülnek.
                            </p>

                            <div className="space-y-4 text-sm mb-6">
                                <div className="flex justify-between items-center text-gray-300">
                                    <span>Autó:</span>
                                    <span className="text-white font-medium">{car.brand} {car.model} ({car.year})</span>
                                </div>
                                <div className="flex justify-between items-center text-gray-300">
                                    <span>Napi díj:</span>
                                    <span className="text-white font-medium">{car.price_per_day.toLocaleString()} Ft</span>
                                </div>
                                <div className="flex justify-between items-center text-gray-300">
                                    <span>Bérelt napok:</span>
                                    <span className="text-white font-medium">{totalDays} nap</span>
                                </div>
                                <div className="flex justify-between items-center text-gray-300">
                                    <span>Bérlési díj (becsült):</span>
                                    <span className="text-white font-medium">{totalPrice.toLocaleString()} Ft</span>
                                </div>
                                <div className="flex justify-between items-center text-gray-300 border-b border-gray-700 border-dashed pb-4">
                                    <span>Kaució:</span>
                                    <span className="text-white font-medium">{(car.deposit || 50000).toLocaleString()} Ft</span>
                                </div>
                                
                                <div className="flex justify-between items-center pt-2">
                                    <span className="text-green-500 font-bold text-base">Végösszeg (becsült):</span>
                                    <span className="text-xl font-bold text-green-500">
                                        {(totalPrice + (car.deposit || 50000)).toLocaleString()} Ft
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
}