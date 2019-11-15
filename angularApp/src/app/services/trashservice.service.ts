import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Note } from '../model/note.model';

const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', 'jwt_token': localStorage.getItem('token')})} ;
@Injectable({
  providedIn: 'root'
})

export class TrashserviceService {

  private apiUrl = environment.base_url;
  constructor(private http: HttpClient) {
    this.getNotes();
   }

  getNotes(): Observable<any> {
    return this.http.get<Note[]>(this.apiUrl + 'note/trash', httpOptions);
  }

  reStoreNote(note: Note): Observable<any> {
    return this.http.post(this.apiUrl + 'note/untrash', note, httpOptions);
  }
  getArchiveNotes(): Observable<any> {
    return this.http.get(this.apiUrl + 'note/archive', httpOptions);
  }
  unarchiveNote(note: Note) {
    return this.http.post(this.apiUrl + 'note/archivenote', note, httpOptions);
  }
}
