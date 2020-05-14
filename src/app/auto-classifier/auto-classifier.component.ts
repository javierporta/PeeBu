import { Component, OnInit } from "@angular/core";
import { TransactionsService } from "../services/transactions.service";
import { TransactionModel } from "../models/transaction-model";

@Component({
  selector: "app-auto-classifier",
  templateUrl: "./auto-classifier.component.html",
  styleUrls: ["./auto-classifier.component.scss"],
})
export class AutoClassifierComponent implements OnInit {
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
}
