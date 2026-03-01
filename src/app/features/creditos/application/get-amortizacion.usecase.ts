import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditoRepository } from '../domain/ports/credito.repository';
import { CuotaAmortizacion } from '../domain/models/credito.model';

@Injectable()
export class GetAmortizacionUseCase {
  private creditoRepository = inject(CreditoRepository);

  execute(creditoId: string): Observable<CuotaAmortizacion[]> {
    return this.creditoRepository.getAmortizacion(creditoId);
  }
}
