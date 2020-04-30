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
    this.transactionService.getTransactions().subscribe(
      (result) => this.onGetTransactionsSuccess(result),
      (error) => this.onGetTransactionsError(error)
    );
  }

  onGetTransactionsSuccess(result: TransactionModel[]) {
    let gridData = result.map((item) => {
      //We need to map because json from API is not correct (all props are strings)
      item.createdAt = new Date(item.createdAt);
      item.amount = parseFloat(item.amount.toString());
      item.id = parseFloat(item.id.toString());
      return item;
    });
    this.transactions = gridData;
    console.log(this.transactions);
  }

  onGetTransactionsError(error) {}
}
