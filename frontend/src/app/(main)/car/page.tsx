"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation'; 
import { getCars } from '@/services/autoService';
import FilterSidebar from '@/components/features/FilterSidebar';
import CarCard from '@/components/features/CarCard';
import CarModal from '@/components/features/CarModal';
import SearchBar from '@/components/searchbar/searchbar'; 

function CarsContent() {
    const searchParams = useSearchParams(); 
    const [cars, setCars] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCar, setSelectedCar] = useState<any>(null);
    
    const [filters, setFilters] = useState({
        brand: [],
        fuel_type: [],
        transmission: [],
        ordering: '-created_at'
    });

    useEffect(() => {
        const fetchCars = async () => {
            setLoading(true);
            try {
                const startDate = searchParams.get('start_date');
                const endDate = searchParams.get('end_date');

                const queryParams = {
                    ...filters, 
                    start_date: startDate, 
                    end_date: endDate      
                };
                const data = await getCars(queryParams);
                setCars(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        
        const timeoutId = setTimeout(() => {
            fetchCars();
        }, 300);

        return () => clearTimeout(timeoutId);

    }, [filters, searchParams]); 

    const openModal = (car: any) => {
        setSelectedCar(car);
    };

    return (
        <section style={{ minHeight: '100vh', background: '#111', paddingBottom: '80px' }}>
            
            <div style={{ 
                position: 'relative', 
                height: '450px', 
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '-80px', 
                paddingTop: '80px'
            }}>
                {/* HÁTTÉRKÉP */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: "url('/behind_berlo.png')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'brightness(0.4)'
                }}></div>


                {/* KERESŐ DOBOZ */}
                <div style={{ 
                    position: 'relative', 
                    zIndex: 2, 
                    width: '100%', 
                    maxWidth: '900px',
                    padding: '0 1rem'
                }}>
                    <div style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <h2 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.8rem', fontWeight: 'bold' }}>
                            A keresésed
                        </h2>
                        <SearchBar />
                    </div>
                </div>
            </div>

            {/* TARTALOM */}
            <div className="container" style={{ marginTop: '3rem' }}>
                <div style={{marginBottom: '3rem'}}>
                    <h1 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '0.5rem', color: 'white' }}>
                        Elérhető autók <span style={{ color: 'var(--muted)', fontSize: '1.2rem', fontWeight: 'normal' }}>({cars.length} találat)</span>
                    </h1>
                    {searchParams.get('start_date') && (
                        <p style={{color: '#4ade80', fontWeight: 'bold'}}>
                            Időszak: {searchParams.get('start_date')} — {searchParams.get('end_date')}
                        </p>
                    )}

                </div>

                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '300px 1fr', 
                    gap: '2.5rem',
                    alignItems: 'start'
                }}>
                    
                    {/* SZŰRŐ OLDALSÁV */}
                    <aside style={{ position: 'sticky', top: '100px' }}>
                        <FilterSidebar filters={filters} setFilters={setFilters} />
                    </aside>

                    {/* AUTÓK RÁCSA */}
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
                        gap: '2rem' 
                    }}>
                        {loading ? (
                            <p style={{color: 'white', fontSize: '1.2rem'}}>Betöltés...</p>
                        ) : cars.length > 0 ? (
                            cars.map((car) => (
                                <CarCard 
                                    key={car.id} 
                                    car={car} 
                                    onViewDetails={openModal}
                                />
                            ))
                        ) : (
                            <div className="card" style={{gridColumn: '1/-1', textAlign: 'center', padding: '3rem'}}>
                                <h3 style={{color: 'white'}}>Nincs találat.</h3>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* MODAL */}
            {selectedCar && (
                <CarModal 
                    car={selectedCar}
                    isOpen={true} 
                    onClose={() => setSelectedCar(null)} 
                />
            )}
        </section>
    );
}
export default function CarsPage() {
    return (
        <Suspense fallback={<div style={{color:'white', textAlign:'center', padding:'50px'}}>Autók betöltése...</div>}>
            <CarsContent />
        </Suspense>
    );
}