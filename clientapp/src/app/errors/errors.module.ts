import { NgModule } from '@angular/core';
import { NotFoundComponent } from './components/notfound.component';
import { NzResultModule } from 'ng-zorro-antd/result';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [NzResultModule, CommonModule, NzButtonModule, RouterModule],
  exports: [NotFoundComponent],
})
export class ErrorComponentsModule {}
