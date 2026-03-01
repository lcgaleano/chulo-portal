import { EstadoCredito } from '../../../creditos/domain/models/estado-credito.enum';

export interface DashboardSummary {
  totalClientes: number;
  totalCreditos: number;
  montoTotalCreditos: number;
  creditosActivoCount: number;
  creditosCanceladoCount: number;
  creditosEnMoraCount: number;
  montoActivoCreditos: number;
  montoCanceladoCreditos: number;
  montoEnMoraCreditos: number;
  creditosPorEstado: Record<EstadoCredito, number>;
}
