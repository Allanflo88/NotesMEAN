import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Note } from '../models/note';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private url = "http://localhost:8080/notes";

  constructor(private http: HttpClient) {}

  getNotes(): Observable<Note[]>{
    return this.http.get<Note[]>(this.url);
  }

  getNote(id){
    return this.http.get(this.url + "/" + id);
  }

  sendNote(note){
    return this.http.post(this.url, note);
  }

  deleteNote(id){ 
    return this.http.delete(this.url + "/" + id);
  }

  updateNote(note){
    return this.http.put(this.url + "/" + note._id, note);
  }
}
