
var cityNameInputEl = document.querySelector('#cityName');
var cityListButtonsEl = document.querySelector('#cityListButtons');
var weatherContainerEl = document.querySelector('#weatherContainer');
var searchButtonEl= document.querySelector('#searchForm');
var displayTempEl = document.querySelector('#displayTemp');
var todayTempEl = document.querySelector('#todayTemp');
var todayContainerEl = document.querySelector('#todayContainer');
var cityName = cityNameInputEl.value.trim();

var formSubmitHandler = function (event) {
    event.preventDefault();
  
    var cityName = cityNameInputEl.value.trim();
    console.log("hello");
    if (cityName) {
        getCityWeather(cityName);
  
      todayContainerEl.textContent = '';
      cityNameInputEl.value = '';
    } else {
      alert('Please enter a city or else there is no point');
    }
  };
   

var getCityWeather = function (cityName) {
    var apiUrl = 'http://api.openweathermap.org/data/2.5/forecast?q='+ cityName +'&units=imperial&appid=1eb17488ca9670d4cf03b87ad6c21355 ';
    fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            console.log(data);
            displaytoday(data, cityName);
            //getCityPick2(data, cityName)
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

  
//current today's forecast
var displaytoday = function (weather, searchTerm) {
  for (let i = 0; i < 1; i++){
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
          todayContainerEl.appendChild(dateDisplay);
          
      var tempDisplay = document.createElement('div');
          tempDisplay.innerHTML = "Temperature: " +temperature
          todayContainerEl.appendChild(tempDisplay);

      var humDisplay = document.createElement('div');
          humDisplay.innerHTML = "Humidity: " +humidity
          todayContainerEl.appendChild(humDisplay);

      var windDisplay = document.createElement('div');
          windDisplay.innerHTML = "Wind speed: " +wind
          todayContainerEl.appendChild(windDisplay);

      var iconDisplay = document.createElement("img");
          iconDisplay.setAttribute ("src", `http://openweathermap.org/img/w/${weather.list[0].weather[0].icon}.png`)
          console.log(iconDisplay.src);
          console.log(iconDisplay);
          todayContainerEl.appendChild(iconDisplay);
      
      var getUV = function (geoLat , geoLong ) {
        var apiUrl2 = 'http://api.openweathermap.org/data/2.5/uvi/forecast?lat='+ geoLat +'&lon='+ geoLong +'&start=' + dT +'&end=' + dT +'&appid=1eb17488ca9670d4cf03b87ad6c21355';
        fetch(apiUrl2)
        .then(function (response) {
          if (response.ok) {
            response.json().then(function (data) {
              console.log(data);
              //if (data >= 8){
              //$(data).attr("class", "red");
              //}if (data < 3){
              //$(data).attr("class", "green");
              //} else {
              //$(data).attr("class", "yellow");
              //};


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
       displaySearchCity(cityName);
    };
}};

//displaytoday();
  
  
//five day
  var displaySearchCity = function (weather, searchTerm) {
      for (let i = 0; i < weather.list.length; i ++) {
        if (weather.list[i].dt_txt.indexOf("12:00:00") !== -1) {
          const date = weather.list[i].dt_txt; 
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
          tempDisplay.innerHTML = "Temperature: " +temperature
          weatherContainerEl.appendChild(tempDisplay);

          var humDisplay = document.createElement('div');
          humDisplay.innerHTML = "Humidity: " +humidity
          weatherContainerEl.appendChild(humDisplay);

          var windDisplay = document.createElement('div');
          windDisplay.innerHTML = "Wind speed: " +wind
          weatherContainerEl.appendChild(windDisplay);

          var iconDisplay = document.createElement("img");
          iconDisplay.setAttribute ("src", `http://openweathermap.org/img/w/${weather.list[i].weather[0].icon}.png`)
          console.log(iconDisplay.src);
          console.log(iconDisplay);
          weatherContainerEl.appendChild(iconDisplay);
        }
  }};


  var buttonClickHandler = function (event) {
    var cityPick = event.target.getAttribute('cityList');
  
    if (cityPick) {
        getCityPick(cityPick);
    }
  };

  var getCityPick = function (cityPick) {
    var apiUrl = 'http://api.openweathermap.org/data/2.5/forecast?q='+ cityPick +'&units=imperial&appid=1eb17488ca9670d4cf03b87ad6c21355 ';

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
 
/*
  var getCityPick2 = function (cityName) {
    
    var apiUrl = 'http://api.openweathermap.org/data/2.5/forecast?q='+ CityName +'&units=imperial&appid=1eb17488ca9670d4cf03b87ad6c21355 ';

    fetch(apiUrl).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
            displaySearchCity(data,cityName);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
      console.log(response);
    });
  };
*/
  cityListButtonsEl.addEventListener('click', buttonClickHandler);
  searchButtonEl.addEventListener('submit', formSubmitHandler);

  