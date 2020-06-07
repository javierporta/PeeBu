import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { TransactionModel } from "../models/transaction-model";
import { Observable, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TransactionsService {
  constructor(private http: HttpClient) {
    this.loadTransactions();
  }

  loadTransactions() {
    return this.http
      .get<TransactionModel[]>(`${environment.apiUrl}/sq/transactions`)
      .subscribe(
        (result) => {
          result = result.map((item) => {
            //We need to map because json from API is not correct (all props are strings)
            item.createdAt = new Date(item.createdAt);
            item.amount = parseFloat(item.amount.toString());
            item.id = parseFloat(item.id.toString());
            item.classification = "unclassified";
            return item;
          });

          this._transactions.next(result);
        },
        (error) => {
          console.error("API Error" + error);
          this._transactions.error(error)
        }
      );
  }

  private _transactions: BehaviorSubject<
    TransactionModel[]
  > = new BehaviorSubject([]);

  public readonly transactions: Observable<
    TransactionModel[]
  > = this._transactions.asObservable();

  setTransactions(transactions: TransactionModel[]) {
    this._transactions.next(transactions);
  }
}
