import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [
    LoadingComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    LoadingComponent,
  ]
})
export class SharedModule { }
