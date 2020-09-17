import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ Observable, throwError }   from 'rxjs';
import { Account } from 'src/app/_models/account';
import { Client } from 'src/app/_models/client';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs';
import { Transaction } from 'src/app/_models/transaction';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private baseUrl:string='http://localhost:8080';

  constructor(private httpClient : HttpClient ) { }

  getClientAccounts(id:Number) {
    return this.httpClient.get(this.baseUrl+'/clients/'+id+'/accounts').
        pipe(
          map((data: Account[]) => {
            return data;
          }), catchError( error => {
            return throwError( 'Something went wrong!' );
          })
        )
  }

  getAccounts() {
    return this.httpClient.get(this.baseUrl+'/accounts').
        pipe(
           map((data: any[]) => {
             return data;
           }), catchError( error => {
             return throwError( 'Something went wrong!' );
           })
        )
    }

  getAccountTransactions(accountId : Number){
    return this.httpClient.get(this.baseUrl + '/accounts/' + accountId + '/transactions').      
    pipe(
      map((data: Transaction[]) => {
        return data;
      }), catchError( error => {
        return throwError( 'Something went wrong!' );
      })
    );
  }

  newAccount(accountForm: any){
    return this.httpClient.post(this.baseUrl + '/accounts', accountForm);
  }

  getAccount(accountId){
    return this.httpClient.get(this.baseUrl + '/accounts/' + accountId).pipe(
      map((data: Account) => {
        return data;
      }), catchError( error => {
        return throwError( 'Something went wrong!' );
      })
    );
  }

  updateAmount(body: Account, deposit: Number){
    body.amount = deposit;
    return this.httpClient.put(this.baseUrl + '/accounts/' + body.id, body);
  }

  updateAccount(body: Account){
    return this.httpClient.put(this.baseUrl + '/accounts/' + body.id, body);
  }

  deleteAccount(accountId){
    return this.httpClient.delete(this.baseUrl + '/accounts/' + accountId);
  }
}
