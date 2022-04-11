var Weather = /** @class */ (function () {
    function Weather(currentConditions, city) {
        this.location = city.EnglishName;
        this.weatherText = currentConditions.WeatherText;
        this.isDaytime = currentConditions.IsDayTime;
        if (currentConditions.WeatherIcon)
            this.weatherIconUrl = "../assets/images/" + currentConditions.WeatherIcon + ".png";
        this.temperatureValue = currentConditions.Temperature.Metric.Value;
        this.temperatureUnit = currentConditions.Temperature.Metric.Unit;
    }
    return Weather;
}());
export { Weather };
//# sourceMappingURL=weather.js.map
