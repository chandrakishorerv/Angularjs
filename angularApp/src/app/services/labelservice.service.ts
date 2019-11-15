import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Label } from 'src/app/model/label.model';
import { LabelDTO } from '../model/labelDTO.model';

const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', 'jwt_token': localStorage.getItem('token')})} ;
@Injectable({
  providedIn: 'root'
})
export class LabelserviceService {
  label: Label;
  private apiurl = environment.base_url;
  constructor(private http: HttpClient) { }
  // private apiUrl = 'http://localhost:8085/label/getlables';
  getLabels(): Observable<Label[]> {
    return this.http.get<Label[]>(this.apiurl + 'label/getlables', httpOptions);
  }
  updateLabel(label: Label): Observable<any> {
    console.log(label.labelName + '    label is updated');
    return this.http.post(this.apiurl + 'label/updatelable', label, httpOptions);
  }

  createLabel(labelDTO: LabelDTO): Observable<any>  {
     console.log(labelDTO.labelName + '   label is created');
     return this.http.post(this.apiurl + 'label/createlable', labelDTO.labelName, httpOptions);
  }

  deleteLabel(label: Label): Observable<any>  {
    console.log(label.labelName + '   label is deleted');
    return this.http.post(this.apiurl + 'label/deletelable', label, httpOptions);
 }
}
