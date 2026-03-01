import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditoRepository } from '../domain/ports/credito.repository';
import { CreateCreditoCommand, Credito } from '../domain/models/credito.model';

@Injectable()
export class CreateCreditoUseCase {
  private creditoRepository = inject(CreditoRepository);

  execute(command: CreateCreditoCommand): Observable<Credito> {
    return this.creditoRepository.createCredito(command);
  }
}
