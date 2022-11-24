import { HttpClientModule } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from '../app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './angular-material.module';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
  ],
  exports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    AngularMaterialModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ShareModule { }
