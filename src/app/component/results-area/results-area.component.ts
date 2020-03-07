import { ChangeDetectorRef, Component, Input, NgZone, OnInit } from '@angular/core';
import { Trip } from '../../generated/tripGo';
import { Subject } from 'rxjs';

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

    constructor(private changeDetector: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.leftTrip$.subscribe(trip => {
            this.leftTripLoaded = true;
            this.changeDetector.detectChanges();
        });
        this.rightTrip$.subscribe(trip => {
            this.rightTripLoaded = true;
            this.changeDetector.detectChanges();
        });
    }


    showResults() {
        return this.leftTripLoaded && this.rightTripLoaded;
    }
}
