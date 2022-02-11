import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [],
  imports: [CommonModule, FormsModule, TranslateModule, MatButtonModule],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule, MatButtonModule],
})
export class SharedModule {}
