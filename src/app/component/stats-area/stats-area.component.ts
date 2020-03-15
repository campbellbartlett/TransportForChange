import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Statistic, Statistics } from '../../statistics/statistics';
import { Subject, zip } from 'rxjs';
import { Trip } from '../../generated/tripGo';
import { TripGoService } from '../../service/trip-go.service';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-stats-area',
    templateUrl: './stats-area.component.html',
    styleUrls: ['./stats-area.component.scss'],
})
export class StatsAreaComponent implements OnInit {
    @Input() leftTrip$: Subject<Trip>;
    @Input() rightTrip$: Subject<Trip>;

    isLoading = false;
    delta: number;
    statistic: Statistic;

    constructor(private changeDetector: ChangeDetectorRef,
                private tripGoService: TripGoService) {

    }

    static getRandomStat(): Statistic {
        const numberOfStats = Statistics.length;
        const indexOfRandomStat = Math.floor(Math.random() * Math.floor(numberOfStats));

        return Statistics[indexOfRandomStat];
    }

    ngOnInit() {
        this.tripGoService.isLoading$.subscribe(isLoading => {
            this.isLoading = isLoading;
            this.statistic = StatsAreaComponent.getRandomStat();
            this.changeDetector.detectChanges();
        });

        zip(this.leftTrip$, this.rightTrip$)
            .pipe(map(trips => ({leftTrip: trips[0], rightTrip: trips[1]})))
            .subscribe(trips => {
                this.delta = trips.rightTrip.carbonCost - trips.leftTrip.carbonCost;
            });
    }

}
