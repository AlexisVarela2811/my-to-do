export interface Task {
    id: string;
    titulo: string;
    descripcion: string;
    completado?: boolean;
    fechaVencimiento?: string;
    prioridad?: string;
    usuario: string;
}
