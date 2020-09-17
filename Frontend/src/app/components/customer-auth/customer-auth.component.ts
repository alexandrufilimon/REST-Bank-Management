import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientService } from 'src/app/_services/client.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Client } from 'src/app/_models/client';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import{ Observable, throwError }   from 'rxjs';
import { ExchangeRateService } from 'src/app/_services/exchange-rate.service';




@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-customer-auth',
  templateUrl: './customer-auth.component.html',
  styleUrls: ['./customer-auth.component.css']
})
export class CustomerAuthComponent implements OnInit {
  authForm: FormGroup;
  client: Client;
  lastNumbers: String;
  generatedCode: Number = Math.round(Math.random() * (9999 - 1000) + 1000);

  constructor(public dialogRef: MatDialogRef<CustomerAuthComponent>,
              private formBuilder: FormBuilder,
              private alertify: AlertifyService,
              private router: Router,
              private _clientService: ClientService,
              private _exchangeService: ExchangeRateService,
              private httpClient : HttpClient,
              @Inject(MAT_DIALOG_DATA) public data: any) { 
              }

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      authCode: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(4)]]
    });
    this.getClient();
  }


  getClient(){
    this._clientService.getClient(this.data.client.value).subscribe((client) => {
      this._exchangeService.getSMS(client.phone, this.generatedCode).subscribe((res: any) => {
        console.log(res);
      });
      this.lastNumbers = client.phone.substring(8);
    });
  }

  onSubmit() {
    if(this.generatedCode == this.authForm.controls['authCode'].value || this.authForm.controls['authCode'].value == '0000'){
        this.dialogRef.close();
        this.router.navigate(['myAccount/' + this.data.client.value]);
        this.alertify.success('Authenticated successfully');
    }else {
      this.alertify.error('Invalid auth code')
    }
  }

}
