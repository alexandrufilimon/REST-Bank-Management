import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/_models/account';
import { AccountService } from 'src/app/_services/account.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router';
import { ExchangeRateService } from 'src/app/_services/exchange-rate.service';
import { Rates } from 'src/app/_models/rate';
import { Client } from 'src/app/_models/client';
import { MatDialog } from '@angular/material';
import { ClientService } from 'src/app/_services/client.service';
import { ClientDetailsComponent } from 'src/app/components/clients/client-details/client-details.component';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  private clients: Client[] = [];
  private accounts: Account[] = [];

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

  editClient(cl : Client){
    this.dialog.open(ClientDetailsComponent, {
      width: '400px',
      data: {client: cl }
    });
  }

}
