import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarsModule } from './bars/bars.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShareModule } from './share/share.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BarsModule, AppRoutingModule, CommonModule, ShareModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
