const apiKey = 'c2c577661d9e43c8d91a1c047b497bc2'; // Tu clave de API

async function getWeather() {
    const city = document.getElementById('city').value.trim(); // Obtener ciudad ingresada por el usuario

    // Si no hay ciudad ingresada, mostramos un mensaje.
    if (city === '') {
        alert('Por favor ingresa una ciudad');
        return;
    }

    // Construimos la URL de la API de OpenWeatherMap
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`;

    try {
        // Hacemos la solicitud a la API
        const response = await fetch(url);
        const data = await response.json();

        // Si la ciudad no es encontrada (código 404)a
        if (data.cod === '404') {
            alert('Ciudad no encontrada');
            return;
        }

        // Extraemos los datos de la respuesta
        const cityName = data.name;
        const temperature = data.main.temp;
        const description = data.weather[0].description;
        const icon = data.weather[0].icon; // Icono del clima

        // Mostramos el icono del clima
        const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        document.getElementById('weather-icon').innerHTML = `<img src="${iconUrl}" alt="${description}" style="width: 96px; height: 96px;">`;

        // Actualizamos los valores de la interfaz
        document.getElementById('temperature').innerText = `${temperature}°C`;
        document.getElementById('description').innerText = description.charAt(0).toUpperCase() + description.slice(1);
        document.getElementById('city-name').innerText = cityName;

        // Mostramos el área de resultados
        document.getElementById('weather').classList.remove('hidden');
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        alert('Hubo un error al obtener los datos del clima. Intenta de nuevo.');
    }
}