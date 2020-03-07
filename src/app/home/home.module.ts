import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';

import { HomePage } from './home.page';
import { AddressBarComponent } from '../component/address-bar/address-bar.component';
import { AddressBoxComponent } from '../component/address-box/address-box.component';
import { ResultsAreaComponent } from '../component/results-area/results-area.component';
import { AppModule } from '../app.module';
import { MomentModule } from 'angular2-moment';
import { ArriveDepartDurationPipe } from '../pipe/arrive-depart-duration.pipe';

@NgModule({
    imports: [
        GooglePlaceModule,
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild([
            {
                path: '',
                component: HomePage
            }
        ]),
        MomentModule
    ],
    declarations: [
        HomePage,
        AddressBarComponent,
        AddressBoxComponent,
        ResultsAreaComponent,
        ArriveDepartDurationPipe
    ]
})
export class HomePageModule {
}
