import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { Credito, CreateCreditoCommand, CreditoResponse, CuotaAmortizacion } from '../models/credito.model';

export const CREDITO_REPOSITORY_TOKEN = new InjectionToken<CreditoRepository>('CreditoRepository');

export abstract class CreditoRepository {
  abstract getCreditos(): Observable<Credito[]>;
  abstract getCreditoById(id: string): Observable<CreditoResponse>;
  abstract getCreditosByClienteId(clienteId: string): Observable<Credito[]>;
  abstract createCredito(command: CreateCreditoCommand): Observable<Credito>;
  abstract updateCredito(id: string, command: Partial<CreateCreditoCommand>): Observable<Credito>;
  abstract deleteCredito(id: string): Observable<void>;
  abstract getAmortizacion(creditoId: string): Observable<CuotaAmortizacion[]>;
}
