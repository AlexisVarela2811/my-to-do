export interface TaskData {
    titulo: string;
    descripcion: string;
    completado?: boolean;
    fechaVencimiento?: string;
    prioridad?: string;
    usuario: string;
}