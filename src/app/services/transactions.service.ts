import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { TransactionModel } from "../models/transaction-model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TransactionsService {
  constructor(private http: HttpClient) {}

  getTransactions(): Observable<TransactionModel[]> {
    return this.http.get<TransactionModel[]>(
      `${environment.apiUrl}/sq/transactions`
    );
  }
}
