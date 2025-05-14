import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
    name: 'date-fix-to-unix',
    standalone: true
})

export class DateFixToUnix implements PipeTransform {
    transform(dateString: string): number {
        return dateString? new Date(dateString).getTime() : 0;
    }
}