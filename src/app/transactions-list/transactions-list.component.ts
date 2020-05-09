import { Component, OnInit } from "@angular/core";
import { TransactionsService } from "../services/transactions.service";
import { TransactionModel } from "../models/transaction-model";
import {
  faCoffee,
  faHamburger,
  faMedkit,
  faUniversity,
  faHouseUser,
  faFilm,
  faSubway,
  faDog,
  faThLarge,
} from "@fortawesome/free-solid-svg-icons";

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
      { name: "food", icon: faHamburger },
      { name: "health", icon: faMedkit },
      { name: "education", icon: faUniversity },
      { name: "household", icon: faHouseUser },
      { name: "entertainment", icon: faFilm },
      { name: "transportation", icon: faSubway },
      { name: "vet", icon: faDog },
      { name: "others", icon: faThLarge },
    ];

    this.classificationTypes = classificationTypes;
  }
}
