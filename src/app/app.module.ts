import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCommonModule } from '@angular/material/core';
import { ItemsComponent } from './pages/items/items.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { MenusComponent } from './pages/menus/menus.component';
import { ModifierGroupsComponent } from './pages/modifier-groups/modifier-groups.component';
import { AuthenticationService } from './providers/authentication.service';
import { JwtInterceptor } from './providers/interceptors/jwt.interceptor';
import { ErrorInterceptor } from './providers/interceptors/error.interceptor';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    MatTabsModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    ItemsComponent,
    CategoriesComponent,
    OverviewComponent,
    MenusComponent,
    ModifierGroupsComponent,
  ],
  providers: [AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
