export enum EInspectionStatus {
  CANCELED = 'Cancelado',
  DONE = 'Concluido',
  PENDING = 'Pendente',
  PROCESSING = 'Em Progresso'
}

export interface IDashboard {
  total: number
  pendencias: number
  ultimaInspecao: string
  inspecoes: {
    jan: number
    fev: number
    mar: number
    abr: number
    mai: number
    jun: number
    jul: number
    ago: number
    set: number
    out: number
    nov: number
    dez: number
  }
}

export interface IInspection {
  id: string
  created_at: {
    _seconds: number;
    _nanoseconds: number
  }
  description: string
  edificio: string
  images: string[]
  inspetor: string
  inspected_at: Date
  status: EInspectionStatus
  updated_at: {
    _seconds: number;
    _nanoseconds: number
  }
}
