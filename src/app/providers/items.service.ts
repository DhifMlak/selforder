import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private http: HttpClient) { }
  // TODO: add types

  getItems(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/items/all`);
  }
  getItem(id:any) {
    return this.http.get(`${environment.apiUrl}/items/${id}`);
  }
  // TODO: add types
  addItem(item: any) {
    return this.http.post(`${environment.apiUrl}/items/add`, item);
  }
  deleteItem(id: any) {
    return this.http.delete(`${environment.apiUrl}/items/${id}`);
  }
}
