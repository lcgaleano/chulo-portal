import { Injectable, inject } from '@angular/core';
import { Observable, combineLatest, map } from 'rxjs';
import { ListClientesUseCase } from '../../clientes/application/list-clientes.usecase';
import { ListCreditosUseCase } from '../../creditos/application/list-creditos.usecase';
import { EstadoCredito } from '../../creditos/domain/models/estado-credito.enum';
import { DashboardSummary } from '../../dashboard/domain/models/dashboard-summary.model';

@Injectable()
export class GetDashboardSummaryUseCase {
  private listClientesUseCase = inject(ListClientesUseCase);
  private listCreditosUseCase = inject(ListCreditosUseCase);

  execute(): Observable<DashboardSummary> {
    return combineLatest([
      this.listClientesUseCase.execute(),
      this.listCreditosUseCase.execute()
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
