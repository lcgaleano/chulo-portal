import { Pipe, PipeTransform } from '@angular/core';
import { ESTADO_CREDITO_LABELS } from '../../features/creditos/domain/models/estado-credito.enum';

@Pipe({
  name: 'estadoCredito',
  standalone: true
})
export class EstadoCreditoPipe implements PipeTransform {
  transform(value: string): string {
    return ESTADO_CREDITO_LABELS[value as keyof typeof ESTADO_CREDITO_LABELS] || value;
  }
}
