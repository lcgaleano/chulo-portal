import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditoRepository } from '../domain/ports/credito.repository';
import { Credito } from '../domain/models/credito.model';

@Injectable()
export class ListCreditosUseCase {
  private creditoRepository = inject(CreditoRepository);

  execute(): Observable<Credito[]> {
    return this.creditoRepository.getCreditos();
  }

  executeByClienteId(clienteId: string): Observable<Credito[]> {
    return this.creditoRepository.getCreditosByClienteId(clienteId);
  }
}
