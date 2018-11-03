export class Evento {
  id: string;
  title: string;
  start: string;
  end?: string;
  tipo?: string;

  constructor(id: string, title: string, start: string, end?: string, tipo?: string) {
    this.id = id;
    this.title = title;
    this.start = start;
    this.end = end;
    this.tipo = tipo;
  }
}
