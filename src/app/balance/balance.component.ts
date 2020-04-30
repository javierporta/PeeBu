import { Component, OnInit } from "@angular/core";
import { TransactionsService } from "../services/transactions.service";
import { TransactionModel } from "../models/transaction-model";

@Component({
  selector: "app-balance",
  templateUrl: "./balance.component.html",
  styleUrls: ["./balance.component.scss"],
})
export class BalanceComponent implements OnInit {
  balance = 0.0;
  constructor(private transactionService: TransactionsService) {}

  ngOnInit() {
    this.transactionService.transactions.subscribe((result) =>
      this.onGetTransactionsSuccess(result)
    );
  }

  onGetTransactionsSuccess(result: TransactionModel[]) {
    this.calculateBalance(result);
  }

  calculateBalance(transactions: TransactionModel[]) {
    this.balance = 0.0;
    //this kinda calculation shouls always be on server side, this is here just for academy purposes
    for (
      let transactionIndex = 0;
      transactionIndex < transactions.length;
      transactionIndex++
    ) {
      const transaction = transactions[transactionIndex];

      if (this.isIncomeTransactionType(transaction)) {
        this.balance += transaction.amount;
      } else {
        //is outcome transaction
        this.balance -= transaction.amount;
      }
    }
  }

  isIncomeTransactionType(transaction: TransactionModel): boolean {
    return transaction.type === "payment" || transaction.type === "deposit";
  }
}
