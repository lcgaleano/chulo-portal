import { EstadoCredito } from './estado-credito.enum';

export interface Credito {
  id: string;
  clienteId: string;
  monto: number;
  tasaInteres: number;
  tasaMora: number;
  plazoMeses: number;
  estado: EstadoCredito;
  saldoPendiente: number;
  fechaDesembolso: string;
  fechaVencimiento: string;
  fechaCreacion: string;
  fechaActualizacion: string;
}

export interface CreateCreditoCommand {
  numeroIdentificacionCliente: string;
  monto: number;
  tasaInteres: number;
  tasaMora: number;
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
  id: number;
  creditoId: number;
  numeroCuota: number;
  montoCuota: number;
  capitalCuota: number;
  interesCuota: number;
  montoPagado: number;
  mora: number;
  fechaVencimiento: string;
  fechaPago: string | null;
  estado: string;
  fechaCreacion: string;
  fechaActualizacion: string;
}
