async function search(event) {
    const phrase = event.target.value;
    const apiKey = '6890f02fd0348c2cec9b0da15abd893d';
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${phrase}&limit=5&appid=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    const ul = document.querySelector('ul');
    ul.innerHTML = ' ';

    for (let i = 0; i < data.length; i++) {

    const {name,lat,lon,country} = data[i];
    ul.innerHTML += `<li 
        data-lat="${lat}" 
        data-lon="${lon}" 
        data-name="${name}">
        ${name}<span> ${country}</span></li>`;
    
    }

}

const debouncedSearch = _.debounce((event) => {
    search(event);
}, 600);

async function showweather(lat,lon,name){
    const apiKey = '6890f02fd0348c2cec9b0da15abd893d';
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    const temp = Math.round(data.main.temp);
    const feelslike = Math.round(data.main.feels_like);
    const humidity = Math.round(data.main.humidity);
    const wind = Math.round(data.wind.speed);
    const icon = data.weather[0].icon;
    document.getElementById('city').innerHTML = name;
    document.getElementById('degrees').innerHTML = temp + '&#8451;';
    document.getElementById('feelslikevalue').innerHTML = feelslike + '<span>&#8451;</span>';
    document.getElementById('windvalue').innerHTML = wind + '<span>km/hr</span>';
    document.getElementById('humidityvalue').innerHTML = humidity + '<span>%</span>';
    document.getElementById('icon').src = `https://openweathermap.org/img/wn/${icon}@4x.png`;
    document.querySelector('form').style.display = 'none';
    document.getElementById('weather').style.display = 'block';
}

document.querySelector('.inputclass').addEventListener('keyup', debouncedSearch);

document.body.addEventListener('click', event =>{
    const li = event.target;
    const {lat,lon,name} = li.dataset;
    localStorage.setItem('lat', lat);
    localStorage.setItem('lon', lon);
    localStorage.setItem('name', name);
    if(!lat){
        return;
    }
    showweather(lat,lon,name);

});

document.getElementById('change').addEventListener('click', event =>{

    document.getElementById('weather').style.display = 'none';
    document.querySelector('form').style.display = 'block';

});

document.body.onload = ()=>{
    if(localStorage.getItem('lat')){
    const lat = localStorage.getItem('lat');
    const lon = localStorage.getItem('lon');
    const name = localStorage.getItem('name');
    showweather(lat,lon,name);
    }
}

