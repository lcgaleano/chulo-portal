export interface Cliente {
  id: string;
  tipoIdentificacion?: string;
  numeroIdentificacion: string;
  nombre?: string;
  apellido?: string;
  email: string;
  telefono: string;
  direccion?: string;
  fechaCreacion?: string;
}

export interface CreateClienteCommand {
  tipoIdentificacion: string;
  numeroIdentificacion: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  direccion: string;
}

export interface ClienteResponse extends Cliente {
  creditosCount?: number;
  montoTotalCreditos?: number;
}
