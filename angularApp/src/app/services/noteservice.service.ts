import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Note } from 'src/app/model/note.model';
import { NoteDTO } from '../model/NoteDto.model';
import { Search } from '../model/search.model';

const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', 'jwt_token': localStorage.getItem('token')})} ;
@Injectable({
  providedIn: 'root'
})
export class NoteserviceService {
  private apiUrl = environment.base_url;
  noteDto: any;
  note: Note;

  constructor(private http: HttpClient) {
  }

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.apiUrl + 'note/getnotes', httpOptions);
  }

  createNote(noteDto: any): Observable<any> {
    this.noteDto = noteDto;
    console.log(this.noteDto);
    return this.http.post<NoteDTO>(this.apiUrl + 'note/createnote', noteDto, httpOptions);
  }
  updateNote(note: Note) {
    return this.http.post<Note>(this.apiUrl + 'note/updatenote', note, httpOptions);
  }
  deleteNote(note: Note): Observable<any> {
    console.log(this.note);
    return this.http.post<Note>(this.apiUrl + 'note/deletenote', note, httpOptions);
  }
  serachNote(search: Search): Observable<any> {
    console.log(search.titleordescription + ' at the service layer');
    return this.http.post<Note>(this.apiUrl + 'note/search' , search.titleordescription,  httpOptions);
  }
  archiveNote(note: Note) {
    console.log(this.note);
    return this.http.post(this.apiUrl + 'note/archivenote', note, httpOptions);
  }
  addlabelnote(labelid, noteId) {
console.log(labelid, noteId);

return this.http.post(this.apiUrl + 'note/createlablenote?labelid=' + labelid + '&noteId=' + noteId,  httpOptions);
  }
  addcolour(colour: string, note: Note) {
    console.log(colour +' at addcolour service');
    return this.http.post(this.apiUrl + 'note/addcolour?colour=' + colour, note, httpOptions);
  }
}
