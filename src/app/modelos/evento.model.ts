export class Evento {
  id: string;
  title: string;
  start: string;
  end?: string;

  constructor(id: string, title: string, start: string, end?: string){
    this.id = id;
    this.title = title;
    this.start = start;
    this.end = end;
  }
}
