import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Group, RoutingResponse, Trip } from '../generated/tripGo';
import { Observable, Subject } from 'rxjs';
import LatLng = google.maps.LatLng;
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TripGoService {
    isLoading$: Subject<boolean> = new Subject();

    private baseUrl: 'https://api.tripgo.com/v1/';

    private httpOptions = {
        headers: new HttpHeaders(
            {'X-TripGo-Key': `${environment.tripGoAPIKey}`}
        ),
        params: new HttpParams()
    };

    constructor(private http: HttpClient) {
    }

    public $getPublicTransportTripsFromPointToPoint(points: LatLongTuple): Observable<RoutingResponse> {

        const api = `https://api.tripgo.com/v1/routing.json?v=11
                                                            &from=(${points.startLat()},${points.startLong()})
                                                            &to=(${points.endLat()},${points.endLong()})
                                                            &modes=pt_pub`;
        return this
            .http
            .get<RoutingResponse>(api, this.httpOptions);
    }

    public $getPrivateVehicleTripsFromPointToPoint(points: LatLongTuple): Observable<RoutingResponse> {

        const api = `https://api.tripgo.com/v1/routing.json?v=11
                                                            &from=(${points.startLat()},${points.startLong()})
                                                            &to=(${points.endLat()},${points.endLong()})
                                                            &modes=me_car`;
        return this
            .http
            .get<RoutingResponse>(api, this.httpOptions);
    }

    public getBestTripFromGroup(groups: Group[]): Trip {
        if (!groups) {
            return null;
        }

        let bestTrip: Trip = null;
        groups.forEach(group => {
            group.trips.forEach(trip => {
                if (!bestTrip) {
                    bestTrip = trip;
                }
                if (bestTrip && trip.weightedScore < bestTrip.weightedScore) {
                    bestTrip = trip;
                }
            });
        });
        return bestTrip;
    }
}

export class LatLongTuple {
    startPoint: LatLng;
    endPoint: LatLng;

    constructor(startPoint: LatLng, endPoint: LatLng) {
        this.startPoint = startPoint;
        this.endPoint = endPoint;
    }

    startLat() {
        return this.startPoint.lat().toFixed(3);
    }

    startLong() {
        return this.startPoint.lng().toFixed(3);
    }

    endLat() {
        return this.endPoint.lat().toFixed(3);
    }

    endLong() {
        return this.endPoint.lng().toFixed(3);
    }
}
