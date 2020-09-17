import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/_services/client.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Account } from 'src/app/_models/account';
import { Transaction } from 'src/app/_models/transaction';
import { AccountService } from 'src/app/_services/account.service';
import { MatDialog } from '@angular/material';
import { AddclientComponent } from 'src/app/components/addclient/addclient.component';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from "@angular/router";
import { AccountDetailsComponent } from 'src/app/components/accounts/account-details/account-details.component';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  private transactions:Transaction[];
  private accountId: Number;
  private clientId: Number;

  constructor(public http: HttpClient,
    private _accountService: AccountService,
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private router: Router) { }

  ngOnInit() {
    this.accountId = Number(this.route.snapshot.paramMap.get("id"));
    this.clientId = Number(this.route.snapshot.paramMap.get("clientid"));
    this.getAccountTransactions();
  }

  getAccountTransactions(){
    this._accountService
    .getAccountTransactions(this.accountId)
    .subscribe((transactions) => {
      this.transactions = transactions;
    });
  }

  setSymbol(type : String){
    if(type == 'Deposit' || type == 'Received transfer'){
      return '+';
    }
    if(type == 'Withdraw' || type == 'Transfer'){
      return '-';
    }
  }

}
