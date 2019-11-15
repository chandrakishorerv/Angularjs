import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
Injectable({
    providedIn: 'root'
  })
export class HttpService {
    constructor(private http: HttpClient) { }
    postService(url, object) {
        return this.http.post<any>(url, object, { observe: 'response' });
      }
  }