import { Component, OnInit } from "@angular/core";
import { TransactionsService } from "../services/transactions.service";
import { TransactionModel } from "../models/transaction-model";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-transactions-list",
  templateUrl: "./transactions-list.component.html",
  styleUrls: ["./transactions-list.component.scss"],
})
export class TransactionsListComponent implements OnInit {
  transactions: TransactionModel[];
  classificationTypes = [];

  constructor(private transactionService: TransactionsService) {}

  ngOnInit() {
    this.initClassification();
    this.transactionService.transactions.subscribe(
      (result) => this.onGetTransactionsSuccess(result),
      (error) => this.onGetTransactionsError(error)
    );
  }

  onGetTransactionsSuccess(result: TransactionModel[]) {
    this.transactions = result;
  }

  onGetTransactionsError(error) {}

  onClickClassifyBtn(rowIndex: number, classification: string) {
    this.transactions[rowIndex].classification = classification;
    this.transactionService.setTransactions(this.transactions);
  }

  initClassification() {
    var classificationTypes = [
      { name: "food", icon: faCoffee },
      { name: "health", icon: faCoffee },
      { name: "education", icon: faCoffee },
      { name: "household", icon: faCoffee },
      { name: "entertainment", icon: faCoffee },
      { name: "transportation", icon: faCoffee },
      { name: "vet", icon: faCoffee },
      { name: "others", icon: faCoffee },
    ];

    this.classificationTypes = classificationTypes;
  }
}
