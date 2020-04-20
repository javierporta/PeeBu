import { Component, OnInit } from "@angular/core";
import { TransactionsService } from "../services/transactions.service";
import { TransactionModel } from "../models/transaction-model";

@Component({
  selector: "app-transactions-list",
  templateUrl: "./transactions-list.component.html",
  styleUrls: ["./transactions-list.component.scss"]
})
export class TransactionsListComponent implements OnInit {
  transactions: TransactionModel[];

  constructor(private transactionService: TransactionsService) {}

  ngOnInit() {
    this.transactionService.getTransactions().subscribe(
      result => this.onGetTransactionsSuccess(result),
      error => this.onGetTransactionsError(error)
    );
  }

  onGetTransactionsSuccess(result: TransactionModel[]) {
    let gridData = result.map(item => {
      item.createdAt = new Date(item.createdAt);
      return item;
    });
    this.transactions = gridData;
  }

  onGetTransactionsError(error) {}
}
