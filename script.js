let weather = {
    apiKey: "2312243ec96d7fe169c2ca396f8e24e9",
    unsplashApiKey: "yQECg7Pbt7GHEv7qi9-20PEg_IlX7aI6MfdPoTOrKlY",
    fetchWeather: function (city){
        fetch("https://api.openweathermap.org/data/2.5/weather?q="
            + city
            + "&units=metric&appid="
            + this.apiKey
        )
        .then((response) => {
            if (!response.ok) {
                alert("No weather found.");
                throw new Error("No weather found");
            }
            return response.json();
        })
        .then((data) => {
            this.fetchBackgroundImage(city);
            this.displayWeather(data);
        });
    },

    fetchBackgroundImage: function(city) {
        const url = `https://api.unsplash.com/search/photos?query=${city}&client_id=${this.unsplashApiKey}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.results.length > 0) {
                    const imageUrl = data.results[0].urls.regular; // Obtenez l'URL de l'image
                    document.body.style.backgroundImage = `url('${imageUrl}')`;
                    document.body.style.backgroundSize = 'cover'; // Ajuster la taille de l'image
                    document.body.style.backgroundPosition = 'center'; // Centrer l'image
                } else {
                    document.body.style.backgroundImage = ''; // Réinitialiser si aucune image trouvée
                }
            })
            .catch(err => console.error(err));
    },

    displayWeather: function(data) {
        const {name} =data;
        const {icon, description} =data.weather[0];
        const {temp, humidity} = data.main;
        const {speed} = data.wind;
        document.querySelector(".city").innerText= "Weather in " + name;
        document.querySelector(".icon").src= "http://openweathermap.org/img/w/" + icon + ".png";
        document.querySelector(".description").innerText=description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText="Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText="Wind speed: " + speed + "km/h";

        document.querySelector(".weather").classList.remove("loading");
        
    },
    search: function(){
        this.fetchWeather(document.querySelector(".search-bar").value)
    }
};

document.querySelector(".search button").addEventListener("click",function(){
    weather.search();

});

document.querySelector(".search-bar").addEventListener("keyup", function(event){
    if (event.key == "Enter") {
        weather.search();
    }
});






