import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { CreditoRepository } from '../../domain/ports/credito.repository';
import { Credito, CreateCreditoCommand, CreditoResponse, CuotaAmortizacion } from '../../domain/models/credito.model';

@Injectable()
export class CreditoHttpRepository extends CreditoRepository {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiBaseUrl}/creditos`;

  override getCreditos(): Observable<Credito[]> {
    return this.http.get<Credito[]>(this.apiUrl);
  }

  override getCreditoById(id: string): Observable<CreditoResponse> {
    return this.http.get<CreditoResponse>(`${this.apiUrl}/${id}`);
  }

  override getCreditosByClienteId(clienteId: string): Observable<Credito[]> {
    return this.http.get<Credito[]>(`${this.apiUrl}/cliente/${clienteId}`);
  }

  override createCredito(command: CreateCreditoCommand): Observable<Credito> {
    return this.http.post<Credito>(this.apiUrl, command);
  }

  override updateCredito(id: string, command: Partial<CreateCreditoCommand>): Observable<Credito> {
    return this.http.put<Credito>(`${this.apiUrl}/${id}`, command);
  }

  override deleteCredito(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  override getAmortizacion(creditoId: string): Observable<CuotaAmortizacion[]> {
    return this.http.get<CuotaAmortizacion[]>(`${this.apiUrl}/${creditoId}/cuotas`);
  }
}
