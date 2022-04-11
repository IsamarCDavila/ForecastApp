import { TestBed } from '@angular/core/testing';
import { CurrentConditionsService } from './current-conditions.service';
describe('CurrentConditionsService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(CurrentConditionsService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=current-conditions.service.spec.js.map