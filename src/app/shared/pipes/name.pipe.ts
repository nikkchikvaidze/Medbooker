import { Pipe, PipeTransform } from '@angular/core';
import { Attendee, AttendeeType } from 'src/app/models';

@Pipe({
  name: 'name',
})
export class NamePipe implements PipeTransform {
  transform(value: Attendee[], entityType: AttendeeType) {
    const entity = value.find(
      (value) => value.attendeeType == entityType
    )?.entity;
    return `${entity?.firstName} ${entity?.lastName}`;
  }
}
