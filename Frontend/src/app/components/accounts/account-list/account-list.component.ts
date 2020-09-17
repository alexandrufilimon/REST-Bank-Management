import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/_models/account';
import { AccountService } from 'src/app/_services/account.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router';
import { ExchangeRateService } from 'src/app/_services/exchange-rate.service';
import { Rates } from 'src/app/_models/rate';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {
  public clientId: Number;
  public accounts: Account[];
  public eurRate: Number;
  public gbpRate: Number;

  constructor(public http: HttpClient,
              private _accountService: AccountService,
              private route: ActivatedRoute,
              private _exchangeService: ExchangeRateService,
              private alertify: AlertifyService,
              private router: Router) { }
  ngOnInit() {
    this.clientId = Number(this.route.snapshot.paramMap.get("id"));
    this.GetClientAccounts();
    this._exchangeService.getRateEURGBP().subscribe((res: Rates) => {
      this.eurRate = res.rates['EUR'];
    });
    this._exchangeService.getRateGBPEUR().subscribe((res: Rates) => {
      this.gbpRate = res.rates['GBP'];
    });
  }

  GetClientAccounts() {
    this._accountService
    .getClientAccounts(this.clientId)
    .subscribe((accounts) => {
      console.log(accounts);
      this.accounts = accounts;
    });
  }

  setClient(id:Number){
    this.clientId = id;
  }

  getClientID(){
    return this.clientId;
  }

  newAccount(){
    this.router.navigate(['newAccount/' + this.clientId]);
  }
}
