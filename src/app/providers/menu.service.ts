import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private httpClient: HttpClient) { }

  getMenus(): any {
    return this.httpClient.get(`${environment.apiUrl}/menus/all`);
  }
  getMenuById(id): any {
    return this.httpClient.get(`${environment.apiUrl}/menus/${id}`).pipe(map(menu => this.transformMenu(menu)));
  }

  transformMenu(menu) {
    Object.defineProperty(menu, 'items',
      Object.getOwnPropertyDescriptor(menu, 'category_ids'));
    delete menu['category_ids'];
    return menu;
  }
}
