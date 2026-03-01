import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ClienteRepository } from '../domain/ports/cliente.repository';
import { CreateClienteCommand, Cliente } from '../domain/models/cliente.model';

@Injectable()
export class CreateClienteUseCase {
  private clienteRepository = inject(ClienteRepository);

  execute(command: CreateClienteCommand): Observable<Cliente> {
    return this.clienteRepository.createCliente(command);
  }
}
