import { Component, OnInit } from "@angular/core";
import { TransactionsService } from "../services/transactions.service";
import { TransactionModel } from "../models/transaction-model";

@Component({
  selector: "app-transactions-list",
  templateUrl: "./transactions-list.component.html",
  styleUrls: ["./transactions-list.component.scss"],
})
export class TransactionsListComponent implements OnInit {
  transactions: TransactionModel[];

  constructor(private transactionService: TransactionsService) {}

  ngOnInit() {
    this.transactionService.transactions.subscribe(
      (result) => this.onGetTransactionsSuccess(result),
      (error) => this.onGetTransactionsError(error)
    );
  }

  onGetTransactionsSuccess(result: TransactionModel[]) {
    this.transactions = result;
  }

  onGetTransactionsError(error) {}

  onClickClassifyBtn(event): void {
    console.log(event);
  }
}
