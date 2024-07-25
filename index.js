
const https = require('https');
const inquirer = require("inquirer");
const colors = require("colors");

inquirer
  .prompt([
    {
      type: "list",
      message: "Good morning! What can I do for you?",
      name: "option",
      choices: ["What's the weather like?", "Pick me up" ],
    }
  ])
  .then((response) => {
    if (response.option.includes('weather')) {
      fetchWeather();
    } else {
      fetchJoke();
    }
  });

const apiKey = '58f91c77f2eecc48613b9892a1ce0d0a';
const city = 'Austin';
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

function fetchWeather() {
    https.get(apiUrl, (res) => {
        let data = '';

        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            try {
                const weatherData = JSON.parse(data);
                //console.log('Weather Data:', weatherData);
                console.log(`Temperature in ${colors.bgBlue(city)}: ${colors.bgMagenta(weatherData.main.temp)}°F`);
                console.log(`Weather description: ${colors.bgYellow(weatherData.weather[0].description)}`);
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        });

    }).on('error', (err) => {
        console.error('Error fetching weather data:', err);
    });
}
function fetchJoke() {
    const options = {
        hostname: 'official-joke-api.appspot.com',
        path: '/random_joke',
        method: 'GET'
    };

    https.get(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            try {
                const jokeData = JSON.parse(data);
                console.log(colors.bgMagenta(jokeData.setup));
                console.log(colors.bgYellow(jokeData.punchline));
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        });

    }).on('error', (err) => {
        console.error('Error fetching joke:', err);
    });
}
