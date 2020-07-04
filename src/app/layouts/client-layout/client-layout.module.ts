import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientLayoutRoutes } from './client-layout.routing';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(ClientLayoutRoutes),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ClientLayoutModule { }
