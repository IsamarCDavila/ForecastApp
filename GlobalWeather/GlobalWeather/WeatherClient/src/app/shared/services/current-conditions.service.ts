import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Constants } from '../../../app/app.constants';
import { CurrentConditions } from '../models/current-conditions';
import { catchError, map, tap } from 'rxjs/operators';
import { ErrorHandleService } from '../../shared/services/error-handle.service';

@Injectable({
  providedIn: 'root'
})
export class CurrentConditionsService {

  constructor(
    private http: HttpClient,
    private errorHandleService: ErrorHandleService) { }

  getCurrentConditions(locationKey: string): Observable<CurrentConditions[]> {

    let queryParams = new HttpParams();
    queryParams = queryParams.append('details', 'true');

    const uri = decodeURIComponent(
      `${Constants.currentConditionsAPIUrl}/${locationKey}?apikey=${Constants.apiKey}`
    );
    return this.http.get<CurrentConditions[]>(uri, { params: queryParams })
      .pipe(
        tap(_ => console.log('fetched current conditions')),
        catchError(this.errorHandleService.handleError('getCurrentConditions', []))
      );
  }

  getDailyConditions(locationKey: string): Observable<any[]> {

    /*let queryParams = new HttpParams();
    queryParams = queryParams.append('details', 'true');*/

    const uri = decodeURIComponent(
      `${Constants.dailyConditionsAPIUrl}/${locationKey}?apikey=${Constants.apiKey}`
    );
    return this.http.get<any>(uri)
      .pipe(
        tap(_ => console.log('fetched daily conditions')),
        catchError(this.errorHandleService.handleError('getDailyConditions', []))
      );
  }



}
