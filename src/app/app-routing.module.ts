import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { TransactionsListComponent } from "./transactions-list/transactions-list.component";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
  { path: "transactions", component: TransactionsListComponent },
  { path: "", component: HomeComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
