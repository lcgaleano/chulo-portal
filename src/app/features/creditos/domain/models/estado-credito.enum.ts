export enum EstadoCredito {
  ACTIVO = 'ACTIVO',
  CANCELADO = 'CANCELADO',
  EN_MORA = 'EN_MORA'
}

export const ESTADO_CREDITO_LABELS: Record<EstadoCredito, string> = {
  [EstadoCredito.ACTIVO]: 'Activo',
  [EstadoCredito.CANCELADO]: 'Cancelado',
  [EstadoCredito.EN_MORA]: 'En mora'
};
