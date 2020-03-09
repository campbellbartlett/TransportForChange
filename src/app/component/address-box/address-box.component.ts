/// <reference types="@types/googlemaps" />
import { Component, EventEmitter, Input, NgZone, OnInit, Output } from '@angular/core';
import LatLngBounds = google.maps.LatLngBounds;
import AutocompleteService = google.maps.places.AutocompleteService;

@Component({
    selector: 'app-address-box',
    templateUrl: './address-box.component.html',
    styleUrls: ['./address-box.component.scss'],
})
export class AddressBoxComponent implements OnInit {
    private addressValue: string;

    @Output()
    addressChange = new EventEmitter<string>();

    @Input()
    get address() {
        return this.addressValue;
    }

    set address(val: string) {
        this.addressValue = val;
        this.addressChange.emit(this.addressValue);
    }

    private GoogleAutocomplete: any;

    autocomplete: { input: string };
    autocompleteItems: any[];
    autoCompleteItemsHidden = true;

    constructor(private zone: NgZone) {
    }

    ngOnInit() {
        this.GoogleAutocomplete = new AutocompleteService();
        this.autocomplete = {input: ''};
        this.autocompleteItems = [];
    }

    inputEvent() {
        if (this.autocomplete.input === '') {
            // handled by changeEvent()
            return;
        }

        const autoCompleteRequest = {
            input: this.autocomplete.input,
            bounds: new LatLngBounds({lat: -33.8688, lng: 151.2093}),  // Lat long in Sydney
            componentRestrictions: {country: 'au'}
        };

        this.GoogleAutocomplete.getPlacePredictions(autoCompleteRequest,
            (predictions, status) => {
                this.autocompleteItems = [];
                this.autoCompleteItemsHidden = predictions ? predictions.length === 0 : true;
                this.zone.run(() => {
                    predictions.forEach((prediction) => {
                        this.autocompleteItems.push(prediction);
                    });
                });
            });
    }

    changeEvent() {
        if (this.autocomplete.input === '') {
            this.autocompleteItems = [];
            this.autoCompleteItemsHidden = true;
        }
    }

    searchResultSelected(item: any) {
        this.autocomplete.input = item.description;
        this.autocompleteItems = [];
        this.autoCompleteItemsHidden = true;
        this.address = item.description;
    }

}
