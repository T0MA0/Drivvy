"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getCarById } from '@/services/autoService';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Fuel, Settings, Calendar, User, ArrowLeft, CheckCircle } from 'lucide-react';

export default function CarDetailsPage() {
    const { id } = useParams();
    const router = useRouter();
    
    const [car, setCar] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCar = async () => {
            if (!id) return;
            try {
                const data = await getCarById(id as string);
                setCar(data);
            } catch (err) {
                setError("Sajnos ez az autó nem található vagy törölték.");
            } finally {
                setLoading(false);
            }
        };

        fetchCar();
    }, [id]);

    if (loading) return <div className="container" style={{paddingTop: '150px', color: 'white'}}>Betöltés...</div>;
    
    if (error) return (
        <div className="container" style={{paddingTop: '150px', textAlign: 'center'}}>
            <h2 style={{color: '#ff4444', marginBottom: '1rem'}}>{error}</h2>
            <Link href="/autok" className="btn btn--ghost">Vissza a listához</Link>
        </div>
    );

    return (
        <section style={{ paddingTop: '120px', paddingBottom: '80px', minHeight: '100vh', background: '#111' }}>
            <div className="container">
                
                {/* Vissza gomb */}
                <button 
                    onClick={() => router.back()} 
                    style={{ 
                        background: 'none', border: 'none', color: 'var(--muted)', 
                        display: 'flex', alignItems: 'center', gap: '5px', 
                        cursor: 'pointer', marginBottom: '1.5rem', fontSize: '1rem' 
                    }}
                >
                    <ArrowLeft size={20} /> Vissza a találatokhoz
                </button>

                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '1.5fr 1fr', // Balra a kép (nagyobb), jobbra az infó
                    gap: '3rem',
                    alignItems: 'start'
                }}>
                    
                    {/* === BAL OLDAL: KÉP ÉS LEÍRÁS === */}
                    <div>
                        {/* Nagy kép */}
                        <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: '2rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <div style={{ position: 'relative', height: '450px', width: '100%' }}>
                                <Image 
                                    src={car.image || '/audi_a4.jpg'} 
                                    alt={`${car.brand} ${car.model}`}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    priority
                                />
                            </div>
                        </div>

                        {/* Részletes leírás */}
                        <div className="card" style={{ background: '#1b1e24', padding: '2rem' }}>
                            <h3 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem', borderBottom: '1px solid #333', paddingBottom: '10px' }}>
                                Részletes leírás
                            </h3>
                            <p style={{ color: '#ccc', lineHeight: '1.8', fontSize: '1rem' }}>
                                {car.description || "Ehhez az autóhoz a tulajdonos nem adott meg részletes leírást, de az alapvető műszaki adatok alapján kiváló választás lehet."}
                            </p>
                            
                            <h3 style={{ color: 'white', fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem', borderBottom: '1px solid #333', paddingBottom: '10px' }}>
                                Felszereltség & Extrák
                            </h3>
                            <ul style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', color: '#aeb6c2' }}>
                                <li style={{display:'flex', gap:'10px'}}><CheckCircle size={18} color="#2ecc71"/> Klíma</li>
                                <li style={{display:'flex', gap:'10px'}}><CheckCircle size={18} color="#2ecc71"/> Bluetooth</li>
                                <li style={{display:'flex', gap:'10px'}}><CheckCircle size={18} color="#2ecc71"/> GPS Navigáció</li>
                                <li style={{display:'flex', gap:'10px'}}><CheckCircle size={18} color="#2ecc71"/> Tolatókamera</li>
                            </ul>
                        </div>
                    </div>

                    {/* === JOBB OLDAL: ADATOK ÉS FOGLALÁS === */}
                    <div style={{ position: 'sticky', top: '120px' }}>
                        
                        {/* Fő információs kártya */}
                        <div className="card" style={{ background: '#1b1e24', padding: '2rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                            
                            <div style={{ marginBottom: '1.5rem' }}>
                                <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'white', lineHeight: 1.1 }}>
                                    {car.brand} <span style={{ color: 'var(--primary)' }}>{car.model}</span>
                                </h1>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px', color: 'var(--muted)' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <User size={16} /> {car.owner?.first_name || 'Drivvy'}
                                    </span>
                                    <span>|</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#f1c40f' }}>
                                        <Star size={16} fill="#f1c40f" /> 5.0 (12 értékelés)
                                    </span>
                                </div>
                            </div>

                            {/* Specifikációk Rács */}
                            <div style={{ 
                                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' 
                            }}>
                                <div style={{ background: '#111', padding: '10px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '10px', color: '#ccc' }}>
                                    <Calendar size={20} color="var(--primary)" /> 
                                    <div>
                                        <div style={{fontSize:'0.8rem', color:'var(--muted)'}}>Évjárat</div>
                                        <div style={{fontWeight:'bold'}}>{car.year}</div>
                                    </div>
                                </div>
                                <div style={{ background: '#111', padding: '10px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '10px', color: '#ccc' }}>
                                    <Fuel size={20} color="var(--primary)" /> 
                                    <div>
                                        <div style={{fontSize:'0.8rem', color:'var(--muted)'}}>Üzemanyag</div>
                                        <div style={{fontWeight:'bold'}}>{car.fuel_type}</div>
                                    </div>
                                </div>
                                <div style={{ background: '#111', padding: '10px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '10px', color: '#ccc' }}>
                                    <Settings size={20} color="var(--primary)" /> 
                                    <div>
                                        <div style={{fontSize:'0.8rem', color:'var(--muted)'}}>Váltó</div>
                                        <div style={{fontWeight:'bold'}}>{car.transmission}</div>
                                    </div>
                                </div>
                                <div style={{ background: '#111', padding: '10px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '10px', color: '#ccc' }}>
                                    <User size={20} color="var(--primary)" /> 
                                    <div>
                                        <div style={{fontSize:'0.8rem', color:'var(--muted)'}}>Férőhely</div>
                                        <div style={{fontWeight:'bold'}}>5 személy</div>
                                    </div>
                                </div>
                            </div>

                            {/* Ár és Gomb */}
                            <div style={{ borderTop: '1px solid #333', paddingTop: '1.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '1.5rem' }}>
                                    <span style={{ color: 'var(--muted)' }}>Napi bérleti díj:</span>
                                    <div style={{ textAlign: 'right' }}>
                                        <span style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                                            {parseInt(car.price_per_day).toLocaleString()} Ft
                                        </span>
                                    </div>
                                </div>

                                <div style={{ marginBottom: '1rem', padding: '10px', background: 'rgba(46, 204, 113, 0.1)', borderRadius: '8px', color: '#ccc', fontSize: '0.9rem' }}>
                                    ℹ️ <strong>Kaució:</strong> {parseInt(car.deposit).toLocaleString()} Ft (Helyszínen fizetendő)
                                </div>

                                <button className="btn btn--primary btn--xl" style={{ width: '100%', textAlign: 'center', justifyContent: 'center' }}>
                                    Foglalás Indítása
                                </button>
                                <p style={{ textAlign: 'center', marginTop: '10px', fontSize: '0.8rem', color: 'var(--muted)' }}>
                                    Nincs rejtett költség. Ingyenes lemondás 24 órával előtte.
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}