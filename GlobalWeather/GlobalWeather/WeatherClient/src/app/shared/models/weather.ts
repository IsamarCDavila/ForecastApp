import { CurrentConditions } from './current-conditions';
import { City } from './city';

export class Weather {
  public location: string;
  public weatherIconUrl: string;
  public weatherText: string;
  public temperatureValue: number;
  public temperatureUnit: string;
  public isDaytime: boolean;
  public windValue: number;
  public windUnit: string;
  public windDirection: string;
  public windDegrees: number;
  public humidity: number;
  public hasPrecipitation: boolean;
  public uvindex: number;
  public uvindexText: string;
  public temperatureValueRealFeal: number;
  public temperatureUnitRealFeal: string;

  public constructor(currentConditions: CurrentConditions, city: City) {
    this.location = city.EnglishName;
    this.weatherText = currentConditions.WeatherText;
    this.isDaytime = currentConditions.IsDayTime;
    if (currentConditions.WeatherIcon)
      this.weatherIconUrl = `../assets/images/${currentConditions.WeatherIcon}.png`;
    this.temperatureValue = currentConditions.Temperature.Metric.Value;
    this.temperatureUnit = currentConditions.Temperature.Metric.Unit;
    this.windValue = currentConditions.Wind.Speed.Metric.Value;
    this.windUnit = currentConditions.Wind.Speed.Metric.Unit;
    this.windDirection = currentConditions.Wind.Direction.Localized;
    this.windDegrees = currentConditions.Wind.Direction.Degrees;
    this.humidity = currentConditions.RelativeHumidity;
    this.hasPrecipitation = currentConditions.HasPrecipitation;
    this.uvindex = currentConditions.UVIndex;
    this.uvindexText = currentConditions.UVIndexText;
    this.temperatureValueRealFeal = currentConditions.RealFeelTemperature.Metric.Value;
    this.temperatureUnitRealFeal = currentConditions.RealFeelTemperature.Metric.Unit;



  }
}
