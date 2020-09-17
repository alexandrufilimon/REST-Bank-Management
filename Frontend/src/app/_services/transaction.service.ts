import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ Observable, throwError }   from 'rxjs';
import { Account } from 'src/app/_models/account';
import { Transaction } from 'src/app/_models/transaction';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private baseUrl:string='http://localhost:8080';
  private transactionForm: FormGroup;

  constructor(private httpClient : HttpClient,
              private formBuilder: FormBuilder) { }

  getTransactions() {
    return this.httpClient.get(this.baseUrl+'/transactions').
        pipe(
           map((data: Transaction[]) => {
             return data;
           }), catchError( error => {
             return throwError( 'Something went wrong!' );
           })
        )
    }

  newTransaction(accountId: Number, amount: Number, date: String, type: String){
    this.transactionForm = this.formBuilder.group({
      amount: [amount],
      date: [date],
      type: [type],
      account: this.formBuilder.group({
        id: [accountId]
      })
      });
    console.log(this.transactionForm)
    return this.httpClient.post(this.baseUrl + '/transactions', this.transactionForm.value);
  }

  deleteTransaction(transactionId){
    return this.httpClient.delete(this.baseUrl + '/transactions/' + transactionId);
  }
}
