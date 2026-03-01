import { Injectable, inject } from '@angular/core';
import { Observable, combineLatest, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { DashboardRepository } from '../../domain/ports/dashboard.repository';
import { DashboardSummary } from '../../domain/models/dashboard-summary.model';
import { EstadoCredito } from '../../../creditos/domain/models/estado-credito.enum';

@Injectable()
export class DashboardHttpRepository extends DashboardRepository {
  private http = inject(HttpClient);
  private apiBaseUrl = environment.apiBaseUrl;

  override getSummary(): Observable<DashboardSummary> {
    return combineLatest([
      this.http.get<any[]>(`${this.apiBaseUrl}/clientes`),
      this.http.get<any[]>(`${this.apiBaseUrl}/creditos`)
    ]).pipe(
      map(([clientes, creditos]) => {
        const creditosPorEstado = {
          [EstadoCredito.ACTIVO]: 0,
          [EstadoCredito.CANCELADO]: 0,
          [EstadoCredito.EN_MORA]: 0
        };

        let montoActivoCreditos = 0;
        let montoCanceladoCreditos = 0;
        let montoEnMoraCreditos = 0;

        creditos.forEach(credito => {
          creditosPorEstado[credito.estado as EstadoCredito]++;

          if (credito.estado === EstadoCredito.ACTIVO) {
            montoActivoCreditos += credito.saldoPendiente;
          } else if (credito.estado === EstadoCredito.CANCELADO) {
            montoCanceladoCreditos += credito.monto;
          } else if (credito.estado === EstadoCredito.EN_MORA) {
            montoEnMoraCreditos += credito.saldoPendiente;
          }
        });

        const montoTotalCreditos = creditos.reduce((sum, c) => sum + c.monto, 0);

        return {
          totalClientes: clientes.length,
          totalCreditos: creditos.length,
          montoTotalCreditos,
          creditosActivoCount: creditosPorEstado[EstadoCredito.ACTIVO],
          creditosCanceladoCount: creditosPorEstado[EstadoCredito.CANCELADO],
          creditosEnMoraCount: creditosPorEstado[EstadoCredito.EN_MORA],
          montoActivoCreditos,
          montoCanceladoCreditos,
          montoEnMoraCreditos,
          creditosPorEstado
        } as DashboardSummary;
      })
    );
  }
}
