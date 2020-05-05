import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }
  // TODO: add types

  getCategories() {
    return this.http.get(`${environment.apiUrl}/categories`);
  }
  // TODO: add types
  addCategory(category: any) {
    return this.http.post(`${environment.apiUrl}/categories/add`, category);
  }
}
