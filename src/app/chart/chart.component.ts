import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../services/transactions.service';
import { TransactionModel } from '../models/transaction-model';
import { LegendLabelsContentArgs } from '@progress/kendo-angular-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  transactions: TransactionModel[];
  hasToShowCharts: boolean = false
  lastTransactions: TransactionModel[];
  lastMonthName: string = ""

  public seriesDataExpenses: ChartModel[] = [];
  public seriesDataIncomes: ChartModel[] = [];
  public seriesDataClassification = [];

  public labelContent(args: LegendLabelsContentArgs): string {
    return `${args.dataItem.entity} - $${args.dataItem.amount}`;
  }

  constructor(private transactionService: TransactionsService) {
    this.labelContent = this.labelContent.bind(this);
  }

  ngOnInit() {
    this.transactionService.transactions.subscribe(
      (result) => this.onGetTransactionsSuccess(result),
      (error) => this.onGetTransactionsError(error)
    );
  }

  onGetTransactionsSuccess(result: TransactionModel[]) {
    this.transactions = result;
    this.getLastTransactions()
  }

  onGetTransactionsError(error) { }

  showChartsClickButton() {
    this.buildExpensesChart()
    this.buildIncomesChart()
    this.buildClassificationChart()
    //show chart
    this.hasToShowCharts = true
  }

  buildExpensesChart() {
    let lastMonth = this.getLastMonth()

    let startDate = new Date(2020, lastMonth, 1)
    let endDate = new Date(2020, lastMonth + 1, 1)

    //filter transaction between date and expenses
    let transactionsOfTheMonth = this.transactions.filter(x => x.createdAt > startDate && x.createdAt < endDate && x.type !== "credit")

    //sort by amount desc
    transactionsOfTheMonth = transactionsOfTheMonth.sort((a, b) => (a.amount < b.amount) ? 1 : -1)

    const maxNumberOfExpensesInChart = 5

    let maxIndex = transactionsOfTheMonth.length >= maxNumberOfExpensesInChart ? maxNumberOfExpensesInChart : transactionsOfTheMonth.length - 1

    let newSeriesData: ChartModel[] = []

    //get top highest transactions
    for (let index = 0; index < maxIndex; index++) {
      const transaction = transactionsOfTheMonth[index];
      newSeriesData.push({ amount: transaction.amount, entity: transaction.entity })
    }
    //refresh chart
    this.seriesDataExpenses = newSeriesData
  }

  buildIncomesChart() {
    let lastMonth = this.getLastMonth()

    let startDate = new Date(2020, lastMonth, 1)
    let endDate = new Date(2020, lastMonth + 1, 1)

    //filter transaction between date and income
    let transactionsOfTheMonth = this.transactions.filter(x => x.createdAt > startDate && x.createdAt < endDate && x.type === "credit")

    //sort by amount desc
    transactionsOfTheMonth = transactionsOfTheMonth.sort((a, b) => (a.amount < b.amount) ? 1 : -1)

    let maxNumberOfIncomesInChart = 3

    let maxIndex = transactionsOfTheMonth.length >= maxNumberOfIncomesInChart ? maxNumberOfIncomesInChart : transactionsOfTheMonth.length - 1

    let newSeriesData: ChartModel[] = []

    //get top  highest transactions
    for (let index = 0; index < maxIndex; index++) {
      const transaction = transactionsOfTheMonth[index];
      newSeriesData.push({ amount: transaction.amount, entity: transaction.entity })
    }
    //refresh chart
    this.seriesDataIncomes = newSeriesData
  }

  buildClassificationChart() {
    var counts = this.transactions.reduce((p, c) => {
      var classification = c.classification;
      if (!p.hasOwnProperty(classification)) {
        p[classification] = 0;
      }
      p[classification]++;
      return p;
    }, {});

    var countsExtended = Object.keys(counts).map(k => {
      return { classification: k, count: counts[k] };
    });

    console.log(countsExtended);
    this.seriesDataClassification = countsExtended;
  }

  getLastTransactions() {
    this.lastTransactions = this.transactions
    this.lastTransactions.sort((a, b) => (a.createdAt < b.createdAt) ? 1 : -1)
    this.lastTransactions = this.lastTransactions.slice(0, 10)
  }

  getLastMonth() {
    let transactionSorted = this.transactions;
    transactionSorted.sort((a, b) => (a.createdAt < b.createdAt) ? 1 : -1)
    let lastTransaction = transactionSorted[0]
    let lastTransactionMonth = lastTransaction.createdAt.getMonth()

    this.lastMonthName = monthNames[lastTransactionMonth]

    return lastTransactionMonth
  }



}

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
