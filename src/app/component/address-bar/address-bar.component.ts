import { Component, Input, OnInit } from '@angular/core';
import { combineLatest, Observable, Subject, zip } from 'rxjs';
import { LatLongTuple } from '../../service/trip-go.service';
// @ts-ignore
import {} from 'googlemaps';
import LatLng = google.maps.LatLng;
import { map } from 'rxjs/operators';

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

    constructor() {
    }

    ngOnInit() {
    }

    collapsePressed() {
        this.cardCollapsed = !this.cardCollapsed;
    }

    async showMeClicked() {
        if (this.startAddress && this.endAddress) {

            const $startPoint = await this.convertAddressToPoint(this.startAddress);
            const $endPoint = await this.convertAddressToPoint(this.endAddress);

            const $combination = combineLatest([$startPoint, $endPoint]);
            $combination.pipe(
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
        const $point = new Subject<LatLng>();
        this.geocoder.geocode({address}, (results, status) => {

            if (status === google.maps.GeocoderStatus.OK) {
                $point.next(new LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng()));
            }

        });
        return $point;
    }
}
