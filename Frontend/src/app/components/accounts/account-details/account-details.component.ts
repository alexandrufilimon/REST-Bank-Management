import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from 'src/app/_services/account.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Account } from 'src/app/_models/account';
import { Router } from '@angular/router';
import { ExchangeRateService } from 'src/app/_services/exchange-rate.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {
  detailsForm: FormGroup;
  accountForm: FormGroup;
  account: Account;
  public selectedValue: String;
  editing: String;

  constructor(public dialogRef: MatDialogRef<AccountDetailsComponent>,
              private _accountService: AccountService,
              private _exchangeService: ExchangeRateService,
              private alertify: AlertifyService,
              private formBuilder: FormBuilder,
              private router: Router,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.account = this.data.account;
    this.selectedValue = this.account.currencyName;
    this.accountForm = this.formBuilder.group({
      accountName: [{value: this.account.accountName, disabled: true}, [Validators.required, Validators.minLength(3),
                  Validators.maxLength(20)]],
      currencyName: [{value: this.account.currencyName, disabled: true}, [Validators.required]],
      pinCode: [{value: this.account.pinCode, disabled: true}, [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      amount: [{value: this.account.amount, disabled: true}, [Validators.required]]});
  }

  resetPIN(){
    this.alertify.confirm('Are you sure you want to reset PIN?', () => {
      var newPIN: Number = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
      this.account.pinCode = newPIN;
      this._accountService.updateAccount(this.account).subscribe(() => {
        this.alertify.success('PIN has been successfully reseted');
        window.location.reload();
      }, () => {
        this.alertify.error('Error ocurred when resetting PIN');
      });
     });
  }

  manageTransactions(){
    this.router.navigate(['managerLogin/accounts/' + this.account.id + '/transactions']);
    this.dialogRef.close();
  }

  deleteAccount(){
    this.alertify.confirm('Are you sure you want to delete this account?', () => {
      this._accountService.deleteAccount(this.account.id).subscribe(() => {
        this.alertify.success('Account has been successfully deleted');
        window.location.reload();
      }, () => {
        this.alertify.error('Error ocurred when deleting account');
      });
     });
  }

  enableEdit(){
    this.accountForm.controls['accountName'].enable();
    this.accountForm.controls['pinCode'].enable();
    this.accountForm.controls['amount'].enable();
    this.accountForm.controls['currencyName'].enable();
    this.editing='0';
  }

  editAccount(){
    this.account.accountName = this.accountForm.controls['accountName'].value;
    this.account.pinCode = this.accountForm.controls['pinCode'].value;
    this.account.amount = this.accountForm.controls['amount'].value;
    this.account.currencyName = this.accountForm.controls['currencyName'].value;
    this._accountService.updateAccount(this.account).subscribe(() => {
      this.alertify.success('Account updated');
      window.location.reload();
    }, () => {
      this.alertify.error('Error ocurred when updating account');
    });

  }


}
