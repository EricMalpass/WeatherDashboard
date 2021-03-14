
var cityNameInputEl = document.querySelector('#cityName');
var cityListButtonsEl = document.querySelector('#cityListButtons');
var weatherContainerEl = document.querySelector('#weatherContainer');
var searchButtonEl= document.querySelector('#searchForm');
var displayTempEl = document.querySelector('#displayTemp');


var formSubmitHandler = function (event) {
    event.preventDefault();
  
    var cityName = cityNameInputEl.value.trim();
    console.log("hello");
    if (cityName) {
        getCityWeather(cityName);
  
      weatherContainerEl.textContent = '';
      cityNameInputEl.value = '';
    } else {
      alert('Please enter a city or else there is no point');
    }
  };

var getCityWeather = function (cityName) {
    console.log(cityName);
    var apiUrl = 'http://api.openweathermap.org/data/2.5/forecast?q='+ cityName +'&units=imperial&appid=80a1a6942bf842a6a3c370f838f9c965 ';
    fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            console.log(data);
            displaySearchCity(data, cityName);
            displaytoday(data, cityName);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {
        alert('Unable to connect to weather dashboard');
      });
  };
  //getCityWeather();
  


//current forecast
var displaytoday = function (weather, searchTerm) {
  for (let i = 0; i <= 2; i++) {
      const date = weather.list[i].dt_txt;
        console.log(date);
      const temperature = weather.list[i].main.temp;
        console.log(temperature);
      const humidity = weather.list[i].main.humidity;
        console.log(humidity);
      const wind = weather.list[i].wind.speed;
        console.log(wind);
      const icon = weather.list[i].weather[0].icon;
      console.log(icon);
      const dT = weather.list[i].dt;
        console.log(dT);
      const geoLat = weather.city.coord.lat;
        console.log(geoLat);
      const geoLong = weather.city.coord.lon;
        console.log(geoLong);

      var dateDisplay = document.createElement('div');
          dateDisplay.innerHTML = date
          weatherContainerEl.appendChild(dateDisplay);
          
      var tempDisplay = document.createElement('div');
          tempDisplay.innerHTML = temperature
          weatherContainerEl.appendChild(tempDisplay);

      var humDisplay = document.createElement('div');
          humDisplay.innerHTML = humidity
          weatherContainerEl.appendChild(humDisplay);

      var windDisplay = document.createElement('div');
          windDisplay.innerHTML = wind
          weatherContainerEl.appendChild(windDisplay);

      var iconDisplay = document.createElement('div');
          iconDisplay.innerHTML = icon
          weatherContainerEl.appendChild(iconDisplay)
      
      var getUV = function (geoLat , geoLong ) {
        var apiUrl2 = 'http://api.openweathermap.org/data/2.5/uvi/forecast?lat='+ geoLat +'&lon='+ geoLong +'&start=' + dT +'&end=' + dT +'&appid=80a1a6942bf842a6a3c370f838f9c965';
        fetch(apiUrl2)
        .then(function (response) {
          if (response.ok) {
            response.json().then(function (data) {
              console.log(data);
              displaySearchCity(data, UVdata);
            });
          } else {
            alert('Error: ' + response.statusText);
          }
        })
        .catch(function (error) {
          alert('Unable to connect to weather dashboard for UV information');
        });
        getUV();
    };
}};

  
  
//five day
  var displaySearchCity = function (weather, searchTerm) {
      for (let i = 0; i < 5; i ++) {
          const date = weather.list[i].dt_txt;
          //if weather.list[i].dt_txt = 
          console.log(date);
          const temperature = weather.list[i].main.temp;
          console.log(temperature);
          const humidity = weather.list[i].main.humidity;
          console.log(humidity);
          const wind = weather.list[i].wind.speed;
          console.log(wind);

          var dateDisplay = document.createElement('div');
          dateDisplay.innerHTML = date
          weatherContainerEl.appendChild(dateDisplay);
          
          var tempDisplay = document.createElement('div');
          tempDisplay.innerHTML = temperature
          weatherContainerEl.appendChild(tempDisplay);

          var humDisplay = document.createElement('div');
          humDisplay.innerHTML = humidity
          weatherContainerEl.appendChild(humDisplay);

          var windDisplay = document.createElement('div');
          windDisplay.innerHTML = wind
          weatherContainerEl.appendChild(windDisplay);

          //var iconDisplay = document.createElement('div');
          //iconDisplay.innerHTML = icon
          //weatherContainerEl.appendChild(iconDisplay)
          //var iconDisplay = "<img src='http://openweathermap.org/img/wn/" + icon +"@2x.png' onerror='alert(1)'>";
          //weatherContainerEl.innerHTML.appendChild(iconDisplay);

          var iconDisplay = document.createElement("img");
          iconDisplay.setAttribute ("src", `http://openweathermap.org/img/w/${weather.list[i].weather[0].icon}.png`)
          console.log(iconDisplay.src);
          console.log(iconDisplay);
        
     
        }
  };


  var buttonClickHandler = function (event) {
    var cityPick = event.target.getAttribute('cityList');
  
    if (cityPick) {
        getCityPick(cityPick);
    }
  };

  var getCityPick = function (cityPick) {
    var apiUrl = 'http://api.openweathermap.org/data/2.5/forecast?q='+ cityPick +'&units=imperial&appid=80a1a6942bf842a6a3c370f838f9c965 ';

    fetch(apiUrl).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
            displaySearchCity(data,cityPick);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
      console.log(response);
    });
  };

  cityListButtonsEl.addEventListener('click', buttonClickHandler);
  searchButtonEl.addEventListener('submit', formSubmitHandler);

  