export interface CurrentConditions {
  LocalObservationDateTime: string;
  WeatherText: string;
  WeatherIcon: number;
  IsDayTime: boolean;
  Temperature: Temperature;
  Wind: Wind;
  RelativeHumidity: number;
  RealFeelTemperature: Temperature;
  HasPrecipitation: boolean;
  UVIndex: number;
  UVIndexText: string;
}

export interface Metric {
  Unit: string;
  UnitType: number;
  Value:number;
}

export interface Imperial {
  Unit: string;
  UnitType: number;
  Value: number;
}

export interface Temperature {
  Imperial: Imperial;
  Metric: Metric;
}

export interface Wind {
  Direction: WindDirection;
  Speed: Temperature;
}

export interface WindDirection {
  Degrees: number;
  English: string;
  Localized: string;
}


