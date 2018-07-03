import { Component, OnInit } from '@angular/core';
import { Note } from '../models/note';
import { NotesService } from '../services/notes.service';
import * as moment from 'moment';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss']
})
export class NoteFormComponent {

  note:Note = {
    title: "",
    text: "",
    date: ""
  }

  search = "";

  constructor(private service: NotesService, private notes: AppComponent) {
    this.init();
  }
  
  init(){
    this.note = {
      title: "",
      text: "",
      date: ""
    }
    this.search = "";
  }

  save(){
    this.note.date = (new Date(Date.now())).toISOString();
    this.service.sendNote(this.note).subscribe();
    this.note.date = moment(this.note.date, moment.ISO_8601, true).format("DD/MM/YYYY"); 
    this.notes.notes.push(this.note); 
    this.init();
  }

  update() {
    let note = this.notes.notes.find((item)=>{
      return item.title == this.search;
    });

    note.text = this.note.text;
    note.title = this.note.title;
    this.service.updateNote(note).subscribe();
    this.notes.notes.splice(this.notes.notes.findIndex((item)=>{
      return item.title == this.search;
    }),1,note);
    
    this.init();

  }

  delete() {
    let note = this.notes.notes.find((item)=>{
      return item.title == this.search;
    });

    this.service.deleteNote(note["_id"]).subscribe();
    this.notes.notes.splice(this.notes.notes.findIndex((item)=>{
      return item.title == this.search;
    }),1);

    this.init();
  }

}
