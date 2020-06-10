import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { TransactionsListComponent } from "./transactions-list/transactions-list.component";
import { AppRoutingModule } from "./app-routing.module";
import { HomeComponent } from "./home/home.component";
import { ChartComponent } from "./chart/chart.component";
import { HttpClientModule } from "@angular/common/http";
import { GridModule } from "@progress/kendo-angular-grid";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BalanceComponent } from "./balance/balance.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { TooltipModule } from "@progress/kendo-angular-tooltip";
import { ChartsModule } from '@progress/kendo-angular-charts';
import 'hammerjs';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TransactionsListComponent,
    HomeComponent,
    ChartComponent,
    BalanceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GridModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    TooltipModule,
    ChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
