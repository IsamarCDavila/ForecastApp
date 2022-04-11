import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { LocationService } from '../shared/services/location.service';
import { CurrentConditionsService } from '../shared/services/current-conditions.service';
import { Weather } from '../shared/models/weather';
var WeatherComponent = /** @class */ (function () {
    function WeatherComponent(fb, locationService, currentConditionService) {
        var _this = this;
        this.fb = fb;
        this.locationService = locationService;
        this.currentConditionService = currentConditionService;
        this.countries = [];
        this.focus$ = new Subject();
        this.click$ = new Subject();
        this.countryFormatter = function (country) { return country.EnglishName; };
        this.searchCountry = function (text$) {
            var debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
            var clicksWithClosedPopup$ = _this.click$.pipe(filter(function () { return !_this.instanceCountry.isPopupOpen(); }));
            var inputFocus$ = _this.focus$;
            return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(map(function (term) { return (term === ''
                ? _this.countries
                : _this.countries.filter(function (v) { return v.EnglishName.toLowerCase().indexOf(term.toLowerCase()) > -1; })).slice(0, 10); }));
        };
    }
    WeatherComponent.prototype.ngOnInit = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.weatherForm = this.buildForm();
                        return [4 /*yield*/, this.getCountries()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    WeatherComponent.prototype.buildForm = function () {
        return this.fb.group({
            searchGroup: this.fb.group({
                country: [
                    null
                ],
                city: [
                    null,
                    [Validators.required]
                ],
            })
        });
    };
    Object.defineProperty(WeatherComponent.prototype, "cityControl", {
        get: function () {
            return this.weatherForm.get('searchGroup.city');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WeatherComponent.prototype, "countryControl", {
        get: function () {
            return this.weatherForm.get('searchGroup.country');
        },
        enumerable: true,
        configurable: true
    });
    WeatherComponent.prototype.getCountries = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var promise;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        promise = new Promise(function (resolve, reject) {
                            _this.locationService.getCountries()
                                .toPromise()
                                .then(function (res) {
                                _this.countries = res;
                                resolve();
                            }, function (err) {
                                console.error(err);
                                _this.errorMessage = err;
                                reject(err);
                            });
                        });
                        return [4 /*yield*/, promise];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    WeatherComponent.prototype.getCity = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var country, searchText, countryCode, promise, country_1;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        country = this.countryControl.value;
                        searchText = this.cityControl.value;
                        countryCode = country ? country.ID : null;
                        promise = new Promise(function (resolve, reject) {
                            _this.locationService.getCities(searchText, countryCode)
                                .toPromise()
                                .then(function (res) {
                                var data = res;
                                var cities = data;
                                if (cities.length === 0) {
                                    _this.errorMessage = 'Cannot find the specified location.';
                                    reject(_this.errorMessage);
                                }
                                else {
                                    _this.city = cities[0];
                                    resolve();
                                }
                            }, function (err) {
                                console.error(err);
                                _this.errorMessage = err;
                                reject(err);
                            });
                        });
                        return [4 /*yield*/, promise];
                    case 1:
                        _a.sent();
                        if (this.city) {
                            country_1 = this.countries.filter(function (x) { return x.ID === _this.city.Country.ID; })[0];
                            this.weatherForm.patchValue({
                                searchGroup: {
                                    country: country_1,
                                    city: this.city.EnglishName
                                }
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    WeatherComponent.prototype.getCurrentConditions = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var promise;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.city)
                            return [2 /*return*/];
                        promise = new Promise(function (resolve, reject) {
                            _this.currentConditionService.getCurrentConditions(_this.city.Key)
                                .toPromise()
                                .then(function (res) {
                                if (res.length > 0) {
                                    var data = res[0];
                                    _this.weather = new Weather(data, _this.city);
                                    resolve();
                                }
                                else {
                                    _this.errorMessage = "Weather is not available.";
                                    reject(_this.errorMessage);
                                }
                            }, function (err) {
                                console.error(err);
                                reject(err);
                            });
                        });
                        return [4 /*yield*/, promise];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    WeatherComponent.prototype.search = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var searchText;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.weather = null;
                        this.errorMessage = null;
                        searchText = this.cityControl.value;
                        if (!(!this.city ||
                            this.city.EnglishName !== searchText ||
                            !this.city.Key ||
                            !this.city.Country ||
                            !this.city.Country.ID)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getCity()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, this.getCurrentConditions()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    tslib_1.__decorate([
        ViewChild('instance'),
        tslib_1.__metadata("design:type", NgbTypeahead)
    ], WeatherComponent.prototype, "instanceCountry", void 0);
    WeatherComponent = tslib_1.__decorate([
        Component({
            selector: 'app-weather',
            templateUrl: './weather.component.html',
            styleUrls: ['./weather.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [FormBuilder,
            LocationService,
            CurrentConditionsService])
    ], WeatherComponent);
    return WeatherComponent;
}());
export { WeatherComponent };
//# sourceMappingURL=weather.component.js.map