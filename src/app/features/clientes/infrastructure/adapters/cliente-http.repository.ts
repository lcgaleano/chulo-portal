import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { ClienteRepository } from '../../domain/ports/cliente.repository';
import { Cliente, CreateClienteCommand, ClienteResponse } from '../../domain/models/cliente.model';

@Injectable()
export class ClienteHttpRepository extends ClienteRepository {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiBaseUrl}/clientes`;

  override getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  override getClienteById(id: string): Observable<ClienteResponse> {
    return this.http.get<ClienteResponse>(`${this.apiUrl}/${id}`);
  }

  override getClienteByIdentificacion(numeroIdentificacion: string): Observable<ClienteResponse> {
    return this.http.get<ClienteResponse>(`${this.apiUrl}/${numeroIdentificacion}`);
  }

  override createCliente(command: CreateClienteCommand): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiUrl, command);
  }

  override updateCliente(id: string, command: Partial<CreateClienteCommand>): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.apiUrl}/${id}`, command);
  }

  override deleteCliente(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
