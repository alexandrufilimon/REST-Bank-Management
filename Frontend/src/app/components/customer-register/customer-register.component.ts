import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientService } from 'src/app/_services/client.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';
import { ExchangeRateService } from 'src/app/_services/exchange-rate.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-customer-register',
  templateUrl: './customer-register.component.html',
  styleUrls: ['./customer-register.component.css']
})
export class CustomerRegisterComponent implements OnInit {
  detailsForm: FormGroup;
  clientForm: FormGroup;
  public selectedValue: String;
  editing: String;
  maxDate: Date;

  constructor(public dialogRef: MatDialogRef<CustomerRegisterComponent>,
              private _clientService: ClientService,
              private _exchangeService: ExchangeRateService,
              private alertify: AlertifyService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.clientForm = this.formBuilder.group({
      firstName: [null, [Validators.required, Validators.minLength(3),
                  Validators.maxLength(20)]],
      lastName: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      cnp: [null, [Validators.required, Validators.minLength(13), Validators.maxLength(13)]],
      doB: [null, [Validators.required]],
      poB: [null, [Validators.required]],
    phone: [null, [Validators.required]]});
    this.maxDate = new Date(new Date().getFullYear() - 18, new Date().getMonth(), new Date().getDay());
  }


  onSubmit(){
    this.clientForm.controls.doB.setValue(new DatePipe('en').transform(this.clientForm.controls.doB.value, 'yyyy-MM-dd'))
    this._clientService.newClient(this.clientForm.value).subscribe(() => {
      this.alertify.success('Client created successfully');
      this.dialogRef.close();
    }, (error) => {
        this.alertify.error('Make sure your information is correct. CNP / Phone may already exist.');
    });
  }


}
