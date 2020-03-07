import { Pipe, PipeTransform } from '@angular/core';
import { Trip } from '../generated/tripGo';
import * as moment from 'moment';


@Pipe({
  name: 'arriveDepartDuration'
})
export class ArriveDepartDurationPipe implements PipeTransform {

  transform(trip: Trip): any {
    // Multiply by 1000 to convert to correct format
    const depart = moment(trip.depart * 1000);
    const arrive = moment(trip.arrive * 1000);

    return moment.duration(arrive.diff(depart)).humanize(false);
  }

}
