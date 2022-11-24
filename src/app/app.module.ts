import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarsModule } from './bars/bars.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShareModule } from './share/share.module';
import { FrontIndexComponent } from './front-index/front-index.component';
import { RecordFormComponent } from './record-form/record-form.component';
import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
  declarations: [AppComponent, FrontIndexComponent, RecordFormComponent,],
  imports: [BarsModule, AppRoutingModule, CommonModule, ShareModule, NgxEchartsModule.forRoot({
    echarts: () => import('echarts'),
  }),],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
