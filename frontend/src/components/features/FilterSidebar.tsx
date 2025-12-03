import { useState } from "react";

interface FilterProps {
    filters: any;
    setFilters: (filters: any) => void;
}

export default function FilterSidebar({ filters, setFilters }: FilterProps) {
    
    // Ez a függvény kezeli a pipálást (Hozzáad vagy Kivesz a listából)
    const handleCheckboxChange = (category: string, value: string) => {
        const currentValues = filters[category] || [];
        
        let newValues;
        if (currentValues.includes(value)) {
            // Ha már benne volt, kivesszük
            newValues = currentValues.filter((item: string) => item !== value);
        } else {
            // Ha nem volt benne, hozzáadjuk
            newValues = [...currentValues, value];
        }

        // Frissítjük a szülő (Page) állapotát
        setFilters({ ...filters, [category]: newValues });
    };

    const handleSortChange = (e: any) => {
        setFilters({ ...filters, ordering: e.target.value });
    };

    return (
        <div className="card" style={{ padding: '1.5rem', height: 'fit-content' }}>
            <h3 style={{ color: 'var(--primary)', borderBottom: '1px dashed rgba(255,255,255,0.2)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
                Szűrés és Rendezés
            </h3>

            {/* RENDEZÉS */}
            <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--muted)', marginBottom: '0.5rem' }}>Rendezés:</label>
                <select 
                    onChange={handleSortChange}
                    style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', background: '#111', color: 'white', border: '1px solid #333' }}
                >
                    <option value="-created_at">Legújabb hirdetések</option>
                    <option value="price_per_day">Legolcsóbb elöl</option>
                    <option value="-price_per_day">Legdrágább elöl</option>
                </select>
            </div>

            {/* MÁRKA SZŰRŐ */}
            <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Márka</h4>
                {['Audi', 'BMW', 'Opel', 'Suzuki', 'Volkswagen'].map(brand => (
                    <div key={brand} style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
                        <input 
                            type="checkbox" 
                            id={brand} 
                            checked={filters.brand?.includes(brand) || false}
                            onChange={() => handleCheckboxChange('brand', brand)}
                            style={{ marginRight: '10px', accentColor: 'var(--primary)' }} 
                        />
                        <label htmlFor={brand} style={{ color: '#ccc', cursor: 'pointer' }}>{brand}</label>
                    </div>
                ))}
            </div>

            {/* ÜZEMANYAG SZŰRŐ */}
            <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Üzemanyag</h4>
                {['Benzin', 'Dízel', 'Elektromos', 'Hibrid'].map(fuel => (
                    <div key={fuel} style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
                        <input 
                            type="checkbox" 
                            id={fuel} 
                            checked={filters.fuel_type?.includes(fuel) || false}
                            onChange={() => handleCheckboxChange('fuel_type', fuel)}
                            style={{ marginRight: '10px', accentColor: 'var(--primary)' }} 
                        />
                        <label htmlFor={fuel} style={{ color: '#ccc', cursor: 'pointer' }}>{fuel}</label>
                    </div>
                ))}
            </div>

            {/* VÁLTÓ SZŰRŐ */}
            <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Váltó</h4>
                {['Manuális', 'Automata'].map(trans => (
                    <div key={trans} style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
                        <input 
                            type="checkbox" 
                            id={trans} 
                            checked={filters.transmission?.includes(trans) || false}
                            onChange={() => handleCheckboxChange('transmission', trans)}
                            style={{ marginRight: '10px', accentColor: 'var(--primary)' }} 
                        />
                        <label htmlFor={trans} style={{ color: '#ccc', cursor: 'pointer' }}>{trans}</label>
                    </div>
                ))}
            </div>
        </div>
    );
}