window.addEventListener('load', () => {
let long;
let lat;
let tempDegree = document.querySelector('.temp-degree')
let tempDesc = document.querySelector('.temp-desc')
let locTimezone = document.querySelector('.loc-timezone')
let icon = document.getElementById('icon')


if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(position => {
    long = position.coords.longitude
    lat= position.coords.latitude
    
    const key = `a6623e2348bf2361f416e68946d42b37`;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}&units=metric`

    fetch(url, {
      params: {units: 'metric'}})
      .then(res => {
        return res.json()
      })
      .then(data => {
        const temp = data.main.temp;
        const description = data.weather[0].description;
        
        tempDegree.textContent = temp;
        tempDesc.textContent = description;
        locTimezone.textContent = data.name;

        icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        
        // console.log(data, temp, description)
      })
    

  })
}


})

