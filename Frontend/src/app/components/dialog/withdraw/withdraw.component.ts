import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AccountService } from 'src/app/_services/account.service';
import { TransactionService } from 'src/app/_services/transaction.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {
  withdrawForm: FormGroup;
  newAmount: Number;
  today= new Date();
  dateFormatted= '';

  constructor(public dialogRef: MatDialogRef<WithdrawComponent>,
              private alertify: AlertifyService,
              private formBuilder: FormBuilder,
              private _transactionService: TransactionService,
              private _accountService: AccountService,
              @Inject(MAT_DIALOG_DATA) public data: any) { 
                this.dateFormatted = formatDate(this.today, 'yyyy-MM-dd', 'en-US');
              }

  ngOnInit() {
    this.withdrawForm = this.formBuilder.group({
      price: [null, [Validators.required, Validators.min(1)]]
    });
  }
  onSubmit() {
    this.newAmount = this.data.account.amount - this.withdrawForm.controls.price.value;
    console.log(this.newAmount);

    if(this.newAmount < 0){
      this.alertify.error('You don\'t have this amount to withdraw')
    }else {
    this._accountService.updateAmount(this.data.account, this.newAmount).subscribe( () => {
      this._transactionService.newTransaction(this.data.account.id, this.withdrawForm.controls.price.value, this.dateFormatted , "Withdraw").subscribe(() => {
        this.alertify.success('Transaction completed');
      }, (error) => {
          this.alertify.error('Error completing transaction');
      });
      this.alertify.success('You have successfully withdrawed the money');
      this.dialogRef.close();
    }, () => {
      this.alertify.error('Error during deposit');
    });
    }
  }

}
