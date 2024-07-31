import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'persianTranslation',
  standalone: true
})
export class PersianTranslationPipe implements PipeTransform {

  transform(value: string): string {
    let result: string = '';

    switch (value) {
      case 'canceled':
        result = 'لغو شده';
        break;

      case 'completed':
        result = 'تکمیل شده';
        break;

      default:
        result = value;
    }

    return result;
  }

}
