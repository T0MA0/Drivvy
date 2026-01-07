const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

export interface RegisterData {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}

export const registerUser = async (userData: RegisterData) => {
    try {
        const response = await fetch(`${API_URL}/register/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.email ? "Ez az email már foglalt." : "Hiba történt a regisztráció során.");
        }

        return data;
    } catch (error: any) {
        throw error; // Tovább dobjuk a hibát a Hook-nak
    }
};

export const loginUser = async (credentials: { email: string; password: string }) => {
    const response = await fetch(`${API_URL}/token/`, { // A Django Login URL-je
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) throw new Error("Hibás email vagy jelszó!");
    return await response.json(); // Ez visszaadja a { access, refresh } tokeneket
};

export const getUserProfile = async (token: string) => {
    const response = await fetch(`${API_URL}/profile/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Itt küldjük a tokent azonosításra
        },
    });

    if (!response.ok) throw new Error("Nem sikerült lekérni a profilt.");
    return await response.json();
};