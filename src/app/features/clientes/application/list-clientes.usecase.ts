import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ClienteRepository } from '../domain/ports/cliente.repository';
import { Cliente } from '../domain/models/cliente.model';

@Injectable()
export class ListClientesUseCase {
  private clienteRepository = inject(ClienteRepository);

  execute(): Observable<Cliente[]> {
    return this.clienteRepository.getClientes();
  }
}
