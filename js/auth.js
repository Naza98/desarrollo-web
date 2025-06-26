export const login = async (username, password) => {
    try {
        const response = await fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                password: password,
            })
        })

        if(response.ok){
            const usuario = await response.json()
            return usuario;
        } else {
            return null;
        }
    } catch(error) {
        console.log("error:", error);
        return null;
    }
}

export const validarToken = async (accessToken) => {
    try {
        const response = await fetch('https://dummyjson.com/auth/me', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        if(response.ok) {
            const usuario = await response.json();
            return usuario;
        } else {
            return null;
        }
    } catch(error) {
        console.log("Error validando token:", error);
        return null;
    }
}

export const verificarAutenticacion = async () => {
    const token = sessionStorage.getItem('access-token');
    const usuario = sessionStorage.getItem('usuario');
    
    if (!token || !usuario) {
        alert('Por favor, primero debe iniciar sesión');
        window.location.href = 'js/login.html';
        return false;
    }

    const usuarioValido = await validarToken(token);
    if (!usuarioValido) {
        alert('Su sesión ha expirado. Por favor, inicie sesión nuevamente');
        sessionStorage.clear();
        window.location.href = 'js/login.html';
        return false;
    }

    return true;
}