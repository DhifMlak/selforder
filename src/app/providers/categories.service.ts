import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }
  // TODO: add types

  getCategories() : Observable<any[]>{
    return this.http.get<any[]>(`${environment.apiUrl}/category/all`);

  }
  getCategorie(id:any) {
    return this.http.get(`${environment.apiUrl}/category/${id}`);
  }
  // TODO: add types
  addCategory(category: any) {
    return this.http.post(`${environment.apiUrl}/category/add`, category);
  }
  addItemCategory(id: any,idi: any) {
    return this.http.put(`${environment.apiUrl}/category/${id}`, idi);
  }
  deleteCategory(id: any) {
    return this.http.delete(`${environment.apiUrl}/category/${id}`);
  }
}
