import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from 'src/app/_services/account.service';
import { ExchangeRateService } from 'src/app/_services/exchange-rate.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Account } from 'src/app/_models/account';
import { TransactionService } from 'src/app/_services/transaction.service';
import { formatDate } from '@angular/common';
import { Rates } from 'src/app/_models/rate';

@Component({
  selector: 'app-transfer-to-other-account',
  templateUrl: './transfer-to-other-account.component.html',
  styleUrls: ['./transfer-to-other-account.component.css']
})
export class TransferToOtherAccountComponent implements OnInit {
  transferOtherAccountForm: FormGroup;
  amountToSend: Number;
  account: Account;
  today= new Date();
  dateFormatted= '';
  eurRate: Number;
  gbpRate: Number;
  showRate: Number;

  constructor(public dialogRef: MatDialogRef<TransferToOtherAccountComponent>,
              private _accountService: AccountService,
              private _transactionService: TransactionService,
              private _exchangeService: ExchangeRateService,
              private alertify: AlertifyService,
              private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any) {
                this.dateFormatted = formatDate(this.today, 'yyyy-MM-dd', 'en-US');
               }

  ngOnInit() {
    this.transferOtherAccountForm = this.formBuilder.group({
      account: [null, [Validators.required, Validators.minLength(24), Validators.maxLength(24)]],
      price: [null, [Validators.required, Validators.min(1)]]
    });

    this._exchangeService.getRateEURGBP().subscribe((res: Rates) => {
      this.eurRate = res.rates['EUR'];
    });
    this._exchangeService.getRateGBPEUR().subscribe((res: Rates) => {
      this.gbpRate = res.rates['GBP'];
    });
  }
  onSubmit() {
    this.amountToSend = this.transferOtherAccountForm.controls.price.value -(this.transferOtherAccountForm.controls.price.value * 0.015);
    this._accountService.getAccounts().subscribe((res: Account[]) => {
      this.account = res[res.findIndex(a  => a.iban === this.transferOtherAccountForm.controls.account.value)];
      if(this.account != undefined){
        if(this.data.account.client.id == this.account.client.id){
          this.alertify.error("IBAN belongs to one of your accounts. Try \"Transfer to my other accounts\"")
        }else {
        if(this.data.account.currencyName != this.account.currencyName){
          if(this.data.account.currencyName == 'EURO'){
            this.amountToSend = Number(this.gbpRate) * Number(this.amountToSend);
             this.showRate = this.gbpRate;
           } 
             else {
               this.showRate = this.eurRate;
               this.amountToSend = Number(this.eurRate) * Number(this.amountToSend);
             }
             this.alertify.confirm('You\'re about to send ' + this.transferOtherAccountForm.controls.price.value + ' ' + this.data.account.currencyName +
             '. Recipient account will receive ' + Math.round(Number(this.amountToSend) * 1000.0) / 1000.0 + ' ' + this.account.currencyName + '(1' + this.data.account.currencyName + '= ' 
             + this.showRate + this.account.currencyName + ')', () => {
               this.makeTransfer();
               window.location.reload();
               
              });
           } else {
           this.alertify.confirm('You\'re about to send ' + this.transferOtherAccountForm.controls.price.value + ' ' + this.data.account.currencyName +
           '. Recipient account will receive ' + this.amountToSend + ' ' + this.account.currencyName, () => {
             this.makeTransfer();
             window.location.reload();
             
            });
          }
        }
      }
    });
    }

    makeTransfer(){
      var newBalanceSender: number = Number(this.data.account.amount)-Number(this.transferOtherAccountForm.controls.price.value);
      this._accountService.updateAmount(this.data.account, newBalanceSender).subscribe( () => {
        this.alertify.success('Sender amount updated');
        this.createTransaction(this.data.account.id, this.transferOtherAccountForm.controls.price.value, this.dateFormatted , "Transfer");
        var newBalanceReceiver: number = Number(this.account.amount) + Number(this.amountToSend);
        this._accountService.updateAmount(this.account, newBalanceReceiver).subscribe( () => {
          this.alertify.success('Receiver amount updated');
          this.createTransaction(this.account.id, this.amountToSend, this.dateFormatted , "Received transfer");
        }, () => {
          this.alertify.error('Error during transfer');
        });
      }, () => {
        this.alertify.error('Error during transfer');
      });
  
      this.dialogRef.close();
    }

    createTransaction(accountId: Number, amount: Number, dateToday: String, type: String){
      this._transactionService.newTransaction(accountId, amount, dateToday, type).subscribe(() => {
      }, (error) => {
          this.alertify.error('Error completing transaction');
      });
    }

}
