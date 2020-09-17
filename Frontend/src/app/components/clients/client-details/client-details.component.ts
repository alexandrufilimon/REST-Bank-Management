import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientService } from 'src/app/_services/client.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Client } from 'src/app/_models/client';
import { Router } from '@angular/router';
import { ExchangeRateService } from 'src/app/_services/exchange-rate.service';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  detailsForm: FormGroup;
  clientForm: FormGroup;
  client: Client;
  public selectedValue: String;
  editing: String;

  constructor(public dialogRef: MatDialogRef<ClientDetailsComponent>,
              private _clientService: ClientService,
              private _exchangeService: ExchangeRateService,
              private alertify: AlertifyService,
              private formBuilder: FormBuilder,
              private router: Router,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.client = this.data.client;
    this.clientForm = this.formBuilder.group({
      firstName: [{value: this.client.firstName, disabled: true}, [Validators.required, Validators.minLength(3),
                  Validators.maxLength(20)]],
      lastName: [{value: this.client.lastName, disabled: true}, [Validators.required]],
      cnp: [{value: this.client.cnp, disabled: true}, [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      doB: [{value: this.client.doB, disabled: true}, [Validators.required]],
      poB: [{value: this.client.poB, disabled: true}, [Validators.required]]});
  }


  deleteClient(){
    this.alertify.confirm('Are you sure you want to delete this client?', () => {
      this._clientService.deleteClient(this.client.id).subscribe(() => {
        this.alertify.success('Client has been successfully deleted');
        window.location.reload();
      }, () => {
        this.alertify.error('Error ocurred when deleting client');
      });
     });
  }

  enableEdit(){
    this.clientForm.controls['firstName'].enable();
    this.clientForm.controls['lastName'].enable();
    this.clientForm.controls['cnp'].enable();
    this.clientForm.controls['doB'].enable();
    this.clientForm.controls['poB'].enable();
    this.editing='0';
  }

  editClient(){
    this.client.firstName = this.clientForm.controls['firstName'].value;
    this.client.lastName = this.clientForm.controls['lastName'].value;
    this.client.cnp = this.clientForm.controls['cnp'].value;
    this.client.doB = this.clientForm.controls['doB'].value;
    this.client.poB = this.clientForm.controls['poB'].value;
    this._clientService.updateClient(this.client).subscribe(() => {
      this.alertify.success('Client updated');
      window.location.reload();
    }, () => {
      this.alertify.error('Error ocurred when updating client');
    });

  }
}
