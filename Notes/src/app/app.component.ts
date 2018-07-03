import { Component } from '@angular/core';
import { NotesService } from './services/notes.service';
import { Note } from './models/note';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{

  notes: Note[];


  constructor(private service: NotesService){
    this.getNotes();
  }

  getNotes(){
    this.service.getNotes().subscribe(data =>{
      this.notes = data;
      this.notes.forEach((note)=>{
        note.date = moment(note.date, moment.ISO_8601, true).format("DD/MM/YYYY");
      });
    });
  }
}

