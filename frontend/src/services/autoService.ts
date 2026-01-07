import API_URL from "@/lib/api";

export const getCars = async (filters: any = {}) => {
    const params = new URLSearchParams();

    // Végigmegyünk a szűrőkön, és hozzáadjuk az URL-hez
    Object.keys(filters).forEach(key => {
        const value = filters[key];
        if (Array.isArray(value)) {
            // Ha tömb (pl. több márka van kiválasztva), mindegyiket hozzáadjuk
            value.forEach(val => params.append(key, val));
        } else if (value) {
            params.append(key, value);
        }
    });

    //Lekérés a paraméterekkel
    const response = await fetch(`${API_URL}/api/cars/?${params.toString()}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-store' 
    });

    if (!response.ok) {
        throw new Error("Nem sikerült betölteni az autók listáját.");
    }

    return await response.json();
};

export const getCarById = async (id: string) => {
    const response = await fetch(`${API_URL}/cars/${id}/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-store' // Mindig friss adatot kérjen
    });

    if (!response.ok) {
        throw new Error("Nem található ilyen autó.");
    }

    return await response.json();
};