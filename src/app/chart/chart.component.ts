import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../services/transactions.service';
import { TransactionModel } from '../models/transaction-model';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  transactions: TransactionModel[];
  hasToShowCharts: boolean = false

  public seriesData: ExpenseChart[] = [];

  constructor(private transactionService: TransactionsService) { }

  ngOnInit() {
    this.transactionService.transactions.subscribe(
      (result) => this.onGetTransactionsSuccess(result),
      (error) => this.onGetTransactionsError(error)
    );
  }

  onGetTransactionsSuccess(result: TransactionModel[]) {
    this.transactions = result;
  }

  onGetTransactionsError(error) { }

  showChartsClickButton() {
    let startDate = new Date(2020, 2, 1) // March 1
    let endDate = new Date(2020, 3, 1) // April 1

    //filter transaction between date and outcome
    let transactionsOfTheMonth = this.transactions.filter(x => x.createdAt > startDate && x.createdAt < endDate && x.type !== "credit")

    //sort by amount desc
    transactionsOfTheMonth = transactionsOfTheMonth.sort((a, b) => (a.amount < b.amount) ? 1 : -1)

    let maxIndex = transactionsOfTheMonth.length >= 5 ? 5 : transactionsOfTheMonth.length - 1

    let newSeriesData: ExpenseChart[] = []

    //get top 5 highest transactions
    for (let index = 0; index < maxIndex; index++) {
      const transaction = transactionsOfTheMonth[index];
      newSeriesData.push({ amount: transaction.amount, entity: transaction.entity + " (Id: " + transaction.id + ")" })
    }
    //refresh chart
    this.seriesData = newSeriesData

    //show chart
    this.hasToShowCharts = true

    console.log(transactionsOfTheMonth)
  }

}
