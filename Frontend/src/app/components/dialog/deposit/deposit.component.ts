import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from 'src/app/_services/account.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from "@angular/router";
import { AccountListComponent } from '../../accounts/account-list/account-list.component';
import { TransactionService } from 'src/app/_services/transaction.service';
import {formatDate } from '@angular/common';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {
  depositForm: FormGroup;
  currentAmount: Number;
  today= new Date();
  dateFormatted= '';

  constructor(public dialogRef: MatDialogRef<DepositComponent>,
              private formBuilder: FormBuilder,
              private _accountService: AccountService,
              private alertify: AlertifyService,
              private route: ActivatedRoute,
              private _transactionService: TransactionService,
              @Inject(MAT_DIALOG_DATA) public data: any) { 
                this.dateFormatted = formatDate(this.today, 'yyyy-MM-dd', 'en-US');
              }

  ngOnInit() {
    this.depositForm = this.formBuilder.group({
      price: [null, [Validators.required, Validators.min(1)]]
    });
  }
  
  onSubmit() {
    this.currentAmount = this.data.account.amount + this.depositForm.controls.price.value;
    console.log(this.data);
    this._accountService.updateAmount(this.data.account, this.currentAmount).subscribe( () => {
      this._transactionService.newTransaction(this.data.account.id, this.depositForm.controls.price.value, this.dateFormatted , "Deposit").subscribe(() => {
        this.alertify.success('Transaction completed');
      }, (error) => {
          this.alertify.error('Error completing transaction');
      });
      this.alertify.success('You have successfully deposited the money');
      this.dialogRef.close();
    }, () => {
      this.alertify.error('Error during deposit');
    });
  }
}
