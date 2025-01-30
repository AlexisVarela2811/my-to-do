export interface Task {
  _id: string;
  titulo: string;
  descripcion: string;
  completado?: boolean;
  fechaVencimiento?: string;
  prioridad?: string;
  usuario: string;
}
