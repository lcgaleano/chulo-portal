import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ClienteRepository } from '../domain/ports/cliente.repository';
import { ClienteResponse } from '../domain/models/cliente.model';

@Injectable()
export class GetClienteUseCase {
  private clienteRepository = inject(ClienteRepository);

  execute(id: string): Observable<ClienteResponse> {
    return this.clienteRepository.getClienteById(id);
  }

  executeByIdentificacion(numeroIdentificacion: string): Observable<ClienteResponse> {
    return this.clienteRepository.getClienteByIdentificacion(numeroIdentificacion);
  }
}
