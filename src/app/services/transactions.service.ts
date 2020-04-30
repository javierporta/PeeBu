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
      .subscribe((result) => {
        this._transactions.next(result);
      });
  }

  private _transactions: BehaviorSubject<
    TransactionModel[]
  > = new BehaviorSubject([]);

  public readonly transactions: Observable<
    TransactionModel[]
  > = this._transactions.asObservable();
}
