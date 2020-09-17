import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/_services/client.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Account } from 'src/app/_models/account';
import { Client } from 'src/app/_models/client';
import { AccountService } from 'src/app/_services/account.service';
import { MatDialog } from '@angular/material';
import { AddclientComponent } from 'src/app/components/addclient/addclient.component';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AccountDetailsComponent } from 'src/app/components/accounts/account-details/account-details.component';

@Component({
  selector: 'app-manager-login',
  templateUrl: './manager-login.component.html',
  styleUrls: ['./manager-login.component.css']
})
export class ManagerLoginComponent implements OnInit {

  public accounts:Account[] = [];
  public clients:Client[] = [];

  constructor(public http: HttpClient,
              private _clientService: ClientService,
              private _accountService: AccountService,
              public dialog: MatDialog,
              private alertify: AlertifyService,
              private router: Router) {
               }
              
  ngOnInit() {
    this.getClientList();
    this.getAccountList();
  }

  getClientList(){
    this._clientService
    .getClients()
    .subscribe((clients) => {
      this.clients = clients;
    });
  }


  getAccountList(){
    this._accountService
    .getAccounts()
    .subscribe((accounts) => {
      this.accounts = accounts;
    });
  }

  getTotalAccounts(){
    return this.accounts.length;
  }

  getTotalClients(){
    return this.clients.length;
  }

  getDetails(acc : Account){
    this.dialog.open(AccountDetailsComponent, {
      width: '400px',
      data: {account: acc }
    });
  }
}
