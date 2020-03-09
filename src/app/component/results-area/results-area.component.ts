import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Trip } from '../../generated/tripGo';
import { Subject, zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { TripGoService } from '../../service/trip-go.service';

@Component({
    selector: 'app-results-area',
    templateUrl: './results-area.component.html',
    styleUrls: ['./results-area.component.scss'],
})
export class ResultsAreaComponent implements OnInit {
    @Input() leftTrip$: Subject<Trip>;
    @Input() rightTrip$: Subject<Trip>;

    private leftTripLoaded = false;
    private rightTripLoaded = false;

    isLoading = false;

    constructor(private changeDetector: ChangeDetectorRef,
                private tripGoService: TripGoService) {
    }

    ngOnInit() {
        zip(this.leftTrip$, this.rightTrip$)
            .pipe(map(trips => ({leftTrip: trips[0], rightTrip: trips[1]})))
            .subscribe(trips => {
                this.leftTripLoaded = true;
                this.rightTripLoaded = true;
                this.tripGoService.isLoading$.next(false);
            });

        this.tripGoService.isLoading$.subscribe(isLoading => {
            this.isLoading = isLoading;
            this.changeDetector.detectChanges();
        });
    }


    showResults() {
        return this.leftTripLoaded && this.rightTripLoaded;
    }
}
