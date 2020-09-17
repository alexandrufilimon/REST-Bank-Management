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
import { TransactionService } from 'src/app/_services/transaction.service';

@Component({
  selector: 'app-manage-transactions',
  templateUrl: './manage-transactions.component.html',
  styleUrls: ['./manage-transactions.component.css']
})
export class ManageTransactionsComponent implements OnInit {
  private transactions:Transaction[];
  private accountId: Number;
  private account: Account;
  public primaryXAxis: Object;
  public chartData: Object[];
  public primaryYAxis: Object;
  public legendSettings: Object;
  public tooltip: Object;
  public marker: Object;
  private currentMonth = 0;
  private lastMonth = 0;




  constructor(public http: HttpClient,
    private _accountService: AccountService,
    private _transactionService: TransactionService,
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private router: Router) { }

  ngOnInit() {
    this.accountId = Number(this.route.snapshot.paramMap.get("id"));
    this.getAccount();
    this.getAccountTransactions();
    // this.getTransactionsPerMonth();
    //       // Tooltip for chart
    //       this.tooltip = {
    //         enable: true
    //     }
    //     this.primaryXAxis = {
    //         valueType: 'Category'
    //     };
    //     this.primaryYAxis = {
    //       minimum: 0, maximum: 100,
    //       interval: 20,labelFormat: '{value}'
    //     };
    //     this.marker = {
    //         dataLabel:{
    //             visible: true
    //         }
    //     };
    //     this.legendSettings = {
    //         visible: true
    //     };
  }

  getAccount(){
    this._accountService.getAccount(this.accountId).subscribe((account) => {
    this.account = account;
    });
  }

  getAccountTransactions(){
    this._accountService
    .getAccountTransactions(this.accountId)
    .subscribe((transactions) => {
      this.transactions = transactions;
    });
  }

  deleteTransaction(transactionId : Number){
    this.alertify.confirm('Are you sure you want to delete this transaction?', () => {
      this._transactionService.deleteTransaction(transactionId).subscribe(() => {
        this.alertify.success('Transaction has been successfully deleted');
        window.location.reload();
      }, () => {
        this.alertify.error('Error ocurred when deleting account');
      });
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

  // getTransactionsPerMonth(){
  //   var currentMonthNumber= new Date().getMonth()+1;
  //   var lastMonthNumber= currentMonthNumber-1;
  //   for(var item in this.transactions){
  //     var date = new Date(this.transactions[item].date);
  //     var monthNumber = date.getMonth();
  //     if(monthNumber === currentMonthNumber){
  //       this.currentMonth = this.currentMonth+1;
  //     }
    
  //     if(monthNumber === lastMonthNumber){
  //       this.lastMonth = this.lastMonth+1;
  //     }
  //     this.chartData = [{month: Number(currentMonthNumber), transactions: this.currentMonth},
  //       {month: Number(lastMonthNumber), transactions: this.lastMonth }];
  //   }



  // }

}
