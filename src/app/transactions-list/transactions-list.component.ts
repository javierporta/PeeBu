import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { TransactionsService } from "../services/transactions.service";
import { TransactionModel } from "../models/transaction-model";
import {
  faHamburger,
  faMedkit,
  faUniversity,
  faHouseUser,
  faFilm,
  faSubway,
  faDog,
  faThLarge,
} from "@fortawesome/free-solid-svg-icons";
import { RowClassArgs } from '@progress/kendo-angular-grid';

@Component({
  selector: "app-transactions-list",
  templateUrl: "./transactions-list.component.html",
  styleUrls: ["./transactions-list.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class TransactionsListComponent implements OnInit {
  transactions: TransactionModel[];
  classificationTypes = [];
  hasErrorGettingTransactions = false;

  constructor(private transactionService: TransactionsService) { }

  ngOnInit() {
    this.initClassification();
    this.transactionService.transactions.subscribe(
      (result) => this.onGetTransactionsSuccess(result),
      (error) => this.onGetTransactionsError(error)
    );
  }

  onGetTransactionsSuccess(result: TransactionModel[]) {
    this.transactions = result;
    this.hasErrorGettingTransactions = false;
  }

  onGetTransactionsError(error) {
    this.hasErrorGettingTransactions = true;
  }

  onClickClassifyBtn(id: number, classification: string) {
    let rowIndex = this.transactions.findIndex(x => x.id == id)
    this.transactions[rowIndex].classification = classification;
    this.transactionService.setTransactions(this.transactions);

    this.tryToAutoClassifyTransactions(
      this.transactions[rowIndex],
      classification
    );
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

  tryToAutoClassifyTransactions(
    sampleTransaction: TransactionModel,
    newClassification: string
  ) {
    //Look for transactions with the same: Entity, Source and Type, AND not classified yet!
    var matchedTransactions = this.transactions.filter(
      (it) =>
        it.entity == sampleTransaction.entity &&
        it.source == sampleTransaction.source &&
        it.type == sampleTransaction.type &&
        it.classification.toLowerCase() == "unclassified"
    );

    //Autoclassify matched transactions
    matchedTransactions.forEach((transaction) => {
      transaction.classification = newClassification;
    });

    this.transactionService.setTransactions(this.transactions);
  }

  public rowCallback(context: RowClassArgs) {
    let isClassified = context.dataItem.classification.toLowerCase() != "unclassified"
    return {
      highlighted: isClassified
    };
  }
}
