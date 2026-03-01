import { EstadoCredito } from './estado-credito.enum';

export interface Credito {
  id: string;
  clienteId: string;
  monto: number;
  tasaInteres: number;
  plazoMeses: number;
  estado: EstadoCredito;
  saldoPendiente: number;
  cuotaMensual: number;
  fechaCreacion: string;
  fechaUltimaActualizacion: string;
}

export interface CreateCreditoCommand {
  numeroIdentificacionCliente: string;
  monto: number;
  tasaInteres: number;
  plazoMeses: number;
  fechaDesembolso: string;
  fechaVencimiento: string;
}

export interface CreditoResponse extends Credito {
  cliente?: {
    id: string;
    nombre: string;
    apellido: string;
    numeroIdentificacion: string;
  };
}

export interface CuotaAmortizacion {
  cuotaNumero: number;
  saldoInicial: number;
  capital: number;
  interes: number;
  cuota: number;
  saldoFinal: number;
  fecha: string;
}
