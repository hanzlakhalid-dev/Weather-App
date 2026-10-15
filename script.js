// Theme toogle
const toogleBtn_Theme = document.querySelector('.theme-toogle');
toogleBtn_Theme.addEventListener('click', function () {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const isLight = currentTheme === "light";
    const newTheme = isLight ? "dark" : "light";
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme);
    svgColorInvert(newTheme)
})

// Function for svg color change 
function svgColorInvert(theme) {
    document.querySelectorAll('[data-light][data-dark]').forEach(img => {
        img.src = theme === 'dark' ? img.dataset.dark : img.dataset.light;
    });
}
document.addEventListener('DOMContentLoaded', function () {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    svgColorInvert(currentTheme);
});

// Showtoast function
const ShowToast = (message) => {
    const ExistingToast = document.querySelector('.toast');
    if (ExistingToast) {
        ExistingToast.remove();
    }
    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.textContent = message;
    document.body.append(toast)
    setTimeout(() => {
        document.querySelector('.toast')?.remove();
    }, 2000)

}
// funtion for time
function timeupdate() {
    let now = new Date();
    let today = now.getDay();
    let date = now.getDate();
    let month = now.getMonth();
    let year = now.getFullYear();
    let hour = now.getHours();
    let minutes = now.getMinutes();
    let period = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    today = days[today];
    month = months[month]
    const day = document.querySelector('.day');
    const date_ = document.querySelector('.date');
    const time = document.querySelector('.time');
    day.innerHTML = `${today},`;
    date_.innerHTML = `${date} ${month} ${year}`
    time.innerHTML = `${hour} : ${minutes} ${period}`
}
timeupdate();
setInterval(() => {
    timeupdate()
}, 60000)

// click funtion trigger serch bar
let searchBtn = document.querySelectorAll('.Searchbtn');
searchBtn.forEach(btn => {
    btn.addEventListener('click', function (e) {
        FetchWeather(e);
    })
})
// Function for weather
async function FetchWeather(e) {
    const NearestBar = e.target.previousElementSibling;
    const City = NearestBar.value;
    if (!City) {
        ShowToast("Enter a city name");
        return;
    }
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=1d6e57bdf2494dd6b9961038252311&q=${City}&days=1`);
        const data = await response.json();
        const temperature = Math.round(data.current.temp_c);
        const feelslike = Math.round(data.current.feelslike_c);
        const feedback = data.current.condition.text;
        const humidity = data.current.humidity;
        const wind_Speed = data.current.wind_kph;
        const pressure = data.current.pressure_mb;
        const visibility = data.current.vis_km;
        const sunrise = data.forecast.forecastday[0].astro.sunrise;
        const icon = data.current.condition.icon;
        const sunset = data.forecast.forecastday[0].astro.sunset;
        const lastupdated = data.current.last_updated.split('')[1];
        const dateObj = new Date(lastupdated.replace(' ', 'T'));
        const timeAMPM = dateObj.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
        const Country = data.location.country;
        // Dom manuplation
        const maindiv = document.querySelector('.MainContent');
        if(maindiv.classList.contains('display-none')){
            maindiv.classList.remove('display-none')
        }
        const temperature_View = document.querySelector('.temp');
        const feelslike_view = document.querySelectorAll('.feelslike-value');
        const Feedback_view = document.querySelector('.overall-info-feedback');
        const humidity_view = document.querySelector('.humidity-value');
        const wind_Speed_view = document.querySelector('.wind-value');
        const pressure_view = document.querySelector('.pressure-value');
        const location = document.querySelector('.location-city');
        const visibility_view = document.querySelector('.visibility-value');
        const sunrise_view = document.querySelector('.sunrise-value');
        const sunset_view = document.querySelector('.sunset-value');
        const lastudated_view = document.querySelector('.last-updated-time');
        const icon_view = document.querySelector('.weather-expected-pic');
        // rendering
        temperature_View.innerHTML = `${temperature} <span class="unit">°C</span>`
        feelslike_view.forEach(feelslike_view => {
            feelslike_view.innerHTML = `Feels like ${feelslike}°C`
        })
        Feedback_view.innerHTML = `${feedback}`
        humidity_view.innerHTML = `${humidity}%`
        wind_Speed_view.innerHTML = `${wind_Speed}km/h`
        pressure_view.innerHTML = `${pressure}mb`
        visibility_view.innerHTML = `${visibility}km`
        sunrise_view.innerHTML = `${sunrise}`
        sunset_view.innerHTML = `${sunset}`
        lastudated_view.innerHTML = `${timeAMPM}`
        location.innerHTML = `<span class="city">${City}</span>, <span class="country">${Country}</span>`
        icon_view.src = icon;
    }
    catch {
        ShowToast("Failed to load")
    }
}
document.addEventListener('keyup', function(e){
    if(e.key === "Enter"){
     document.querySelector('.Searchbtn')?.click();
    }
})