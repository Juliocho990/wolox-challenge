import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { StartComponent } from './landing/start/start.component';
import { TechnologiesComponent } from './landing/technologies/technologies.component';
import { WoloxersComponent } from './landing/woloxers/woloxers.component';
import { BenefitsComponent } from './landing/benefits/benefits.component';
import { RequirementsComponent } from './landing/requirements/requirements.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ListComponent,
    TechnologiesComponent,
    StartComponent,
    WoloxersComponent,
    BenefitsComponent,
    RequirementsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
