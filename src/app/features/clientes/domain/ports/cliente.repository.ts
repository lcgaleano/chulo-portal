import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente, CreateClienteCommand, ClienteResponse } from '../models/cliente.model';

export const CLIENTE_REPOSITORY_TOKEN = new InjectionToken<ClienteRepository>('ClienteRepository');

export abstract class ClienteRepository {
  abstract getClientes(): Observable<Cliente[]>;
  abstract getClienteById(id: string): Observable<ClienteResponse>;
  abstract getClienteByIdentificacion(numeroIdentificacion: string): Observable<ClienteResponse>;
  abstract createCliente(command: CreateClienteCommand): Observable<Cliente>;
  abstract updateCliente(id: string, command: Partial<CreateClienteCommand>): Observable<Cliente>;
  abstract deleteCliente(id: string): Observable<void>;
}
