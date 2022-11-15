export interface FilterProject {
  id_estado: number,
  id_cliente: number,
  id_tipo: number,
  nombre: string,
  codigo_gestion: string,
}

export interface Projects {
  id_proyecto: number;
  cliente: string;
  codigo_gestion: number;
  fecha_inicio: string;
  fecha_fin: string;
  horas_planificadas: number;
  nombre_proyecto: string;
  estado: string;
}