export interface Cliente {
  id: string;
  tipoIdentificacion?: string;
  numeroIdentificacion: string;
  nombre?: string;
  apellido?: string;
  email: string;
  telefono: string;
  direccion?: string;
  fechaNacimiento?: string;
  fechaExpedicionDocumento?: string;
  lugarExpedicionDocumento?: string;
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
  fechaNacimiento?: string;
  fechaExpedicionDocumento?: string;
  lugarExpedicionDocumento?: string;
}

export interface ClienteResponse extends Cliente {
  creditosCount?: number;
  montoTotalCreditos?: number;
}
