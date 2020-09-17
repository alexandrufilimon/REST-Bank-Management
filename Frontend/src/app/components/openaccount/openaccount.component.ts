import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Client } from 'src/app/_models/client';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/_services/client.service';
import { AccountService } from 'src/app/_services/account.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
declare var require: any; 

@Component({
  selector: 'app-openaccount',
  templateUrl: './openaccount.component.html',
  styleUrls: ['./openaccount.component.css']
})
export class OpenaccountComponent implements OnInit {
  accountForm: FormGroup;
  clients: Client[];
  selectedClient: Client;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private _clientService: ClientService,
              private alertify: AlertifyService,
              private _accountService: AccountService) { }

  ngOnInit() {
    this._clientService
    .getClients()
    .subscribe((clients) => {
      this.clients = clients;
    });
    this.accountForm = this.formBuilder.group({
      client: [null, [Validators.required]],
      accountName: [null, [Validators.required, Validators.minLength(3),
        Validators.maxLength(20)]],
      currencyName: [null, [Validators.required]],
      pinCode: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      amount: [0, [Validators.required]],
      iban: [null, [Validators.required]]
    });
  }
  
  onSubmit() {
    this._accountService.newAccount(this.accountForm.value).subscribe(() => {
      this.router.navigate(['managerLogin']);
      this.alertify.success('Account added successfully');
    }, (error) => {
        this.alertify.error('Make sure your information is correct.');
    });
  }

  generateIBAN(){
    const uniqueRandom = require('unique-random');
    const rand = uniqueRandom(1000000000000000, 9000000000000000);
    const preIBAN = "RO06PORL";
    this.accountForm.controls['iban'].setValue(preIBAN+rand());
  }

}
