import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddFormComponent } from './form/add-form/add-form.component';
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { SearchFilterPipe } from './search-filter.pipe';
import { MultiSelectModule } from 'primeng/multiselect';


@NgModule({
  declarations: [
    AppComponent,
    AddFormComponent,
    SearchFilterPipe,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgSelectModule,
    CommonModule,
    MultiSelectModule,
    NgMultiSelectDropDownModule.forRoot()
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
