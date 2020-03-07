import { Component, Input, OnInit } from '@angular/core';
import { combineLatest, Subject } from 'rxjs';
import { LatLongTuple, TripGoService } from '../../service/trip-go.service';
// @ts-ignore
import { map } from 'rxjs/operators';
import LatLng = google.maps.LatLng;

@Component({
    selector: 'app-address-bar',
    templateUrl: './address-bar.component.html',
    styleUrls: ['./address-bar.component.scss'],
})
export class AddressBarComponent implements OnInit {
    @Input() $startAndEndPoints: Subject<LatLongTuple>;

    cardCollapsed = false;

    startAddress: string;
    endAddress: string;

    private geocoder = new google.maps.Geocoder();

    constructor(private tripGoService: TripGoService) {
    }

    ngOnInit() {
    }

    collapsePressed() {
        this.cardCollapsed = !this.cardCollapsed;
    }

    async showMeClicked() {
        if (this.startAddress && this.endAddress) {
            this.tripGoService.isLoading$.next(true);

            const startPoint$ = await this.convertAddressToPoint(this.startAddress);
            const endPoint$ = await this.convertAddressToPoint(this.endAddress);

            const combination$ = combineLatest([startPoint$, endPoint$])
                .pipe(
                    map(result => ({startPoint: result[0], endPoint: result[1]}))
                ).subscribe(pair => {
                    const startPoint = pair.startPoint;
                    const endPoint = pair.endPoint;
                    const latLongTuple = new LatLongTuple(startPoint, endPoint);
                    this.$startAndEndPoints.next(latLongTuple);
            });
        }

    }

    private convertAddressToPoint(address: string): Subject<LatLng> {
        const point$ = new Subject<LatLng>();
        this.geocoder.geocode({address}, (results, status) => {

            if (status === google.maps.GeocoderStatus.OK) {
                point$.next(new LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng()));
            }

        });
        return point$;
    }
}

