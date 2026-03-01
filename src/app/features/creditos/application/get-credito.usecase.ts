import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditoRepository } from '../domain/ports/credito.repository';
import { CreditoResponse } from '../domain/models/credito.model';

@Injectable()
export class GetCreditoUseCase {
  private creditoRepository = inject(CreditoRepository);

  execute(id: string): Observable<CreditoResponse> {
    return this.creditoRepository.getCreditoById(id);
  }
}
