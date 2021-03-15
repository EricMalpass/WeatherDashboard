# WeatherDashboard

I created a weather dashboard where you can search for a city to recieve today's forecast or you can select a city from a list of button and see a 5 day forecast.I had trouble with a few things on this assignment. Getting the UV index to change colors depending on the scale, when I set it to be called it would set off a loop and send to many requests to the API which caused them to lock my account out, so I stopped testing on this because it took a lot of time to get the account restored.

Acceptance Criteria:
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
