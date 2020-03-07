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
        this.leftTrip$.subscribe(trip => {
            this.leftTripLoaded = true;
            this.changeDetector.detectChanges();
            this.updateIsLoading();
        });
        this.rightTrip$.subscribe(trip => {
            this.rightTripLoaded = true;
            this.changeDetector.detectChanges();
            this.updateIsLoading();
        });

        this.tripGoService.isLoading$.subscribe(isLoading => {
            this.isLoading = isLoading;
            this.changeDetector.detectChanges();
        });
    }

    private updateIsLoading() {
        if (this.showResults()) {
            this.tripGoService.isLoading$.next(false);
        }
    }


    showResults() {
        return this.leftTripLoaded && this.rightTripLoaded;
    }
}
