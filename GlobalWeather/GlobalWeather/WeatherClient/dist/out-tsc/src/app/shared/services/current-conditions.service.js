import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../../../app/app.constants';
import { catchError, tap } from 'rxjs/operators';
import { ErrorHandleService } from '../../shared/services/error-handle.service';
var CurrentConditionsService = /** @class */ (function () {
    function CurrentConditionsService(http, errorHandleService) {
        this.http = http;
        this.errorHandleService = errorHandleService;
    }
    CurrentConditionsService.prototype.getCurrentConditions = function (locationKey) {
        var uri = decodeURIComponent(Constants.currentConditionsAPIUrl + "/" + locationKey + "?apikey=" + Constants.apiKey);
        return this.http.get(uri)
            .pipe(tap(function (_) { return console.log('fetched current conditions'); }), catchError(this.errorHandleService.handleError('getCurrentConditions', [])));
    };
    CurrentConditionsService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient,
            ErrorHandleService])
    ], CurrentConditionsService);
    return CurrentConditionsService;
}());
export { CurrentConditionsService };
//# sourceMappingURL=current-conditions.service.js.map
