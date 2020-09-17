import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from 'src/app/_services/account.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Account } from 'src/app/_models/account';
import { ExchangeRateService } from 'src/app/_services/exchange-rate.service';
import {Rates} from 'src/app/_models/rate';
import { TransactionService } from 'src/app/_services/transaction.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-transfer-to-my-account',
  templateUrl: './transfer-to-my-account.component.html',
  styleUrls: ['./transfer-to-my-account.component.css']
})
export class TransferToMyAccountComponent implements OnInit {
  transferMyAccountForm: FormGroup;
  accounts: Account[];
  sender: Account;
  receiver: Account;
  amountToSend: Number;
  eurRate: Number;
  gbpRate: Number;
  showRate: Number;
  today= new Date();
  dateFormatted= '';

  constructor(public dialogRef: MatDialogRef<TransferToMyAccountComponent>,
              private _accountService: AccountService,
              private _exchangeService: ExchangeRateService,
              private alertify: AlertifyService,
              private _transactionService: TransactionService,
              private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any) { 
                this.dateFormatted = formatDate(this.today, 'yyyy-MM-dd', 'en-US');
              }

  ngOnInit() {
    this.transferMyAccountForm = this.formBuilder.group({
      account: [null, [Validators.required]],
      price: [null, [Validators.required, Validators.min(0.5)]]
    });
    this._accountService.getClientAccounts(this.data.account.client.id).subscribe((res: Account[]) => {
      this.accounts = res;
      this.accounts.forEach((element, index) => {
          if (element.iban === this.data.account.iban) {
            this.accounts.splice(index, 1);
          }
      });
    });
    this._exchangeService.getRateEURGBP().subscribe((res: Rates) => {
      this.eurRate = res.rates['EUR'];
    });
    this._exchangeService.getRateGBPEUR().subscribe((res: Rates) => {
      this.gbpRate = res.rates['GBP'];
    });
  }
  onSubmit() {
    this.receiver = this.accounts[this.accounts.findIndex(a  => a === this.transferMyAccountForm.controls.account.value)];
    this.sender = this.data.account; 
    this.amountToSend = this.transferMyAccountForm.controls.price.value;

    if(this.amountToSend <= this.sender.amount) {
      if(this.sender.currencyName != this.receiver.currencyName){
        if(this.sender.currencyName == 'EURO'){
          this.amountToSend = Number(this.gbpRate) * Number(this.amountToSend);
          this.showRate = this.gbpRate;
        } 
        else {
          this.showRate = this.eurRate;
          this.amountToSend = Number(this.eurRate) * Number(this.amountToSend);
        }
        this.alertify.confirm('You\'re about to send ' + this.transferMyAccountForm.controls.price.value + ' ' + this.sender.currencyName +
        '. Recipient account will receive ' + Math.round(Number(this.amountToSend) * 1000.0) / 1000.0 + ' ' + this.receiver.currencyName + '(1' + this.sender.currencyName + '= ' 
        + this.showRate + this.receiver.currencyName + ')', () => {
          this.makeTransfer();
          window.location.reload();
          
         });
      } else {
        this.alertify.confirm('You\'re about to send ' + this.transferMyAccountForm.controls.price.value + ' ' + this.sender.currencyName +
        '. Recipient account will receive ' + this.amountToSend + ' ' + this.receiver.currencyName, () => {
          this.makeTransfer();
          window.location.reload();
          
        });
      }
      
    } else {
      this.alertify.error('Make sure the amount you want to send is lower than your balance');
    }
    
  }

  createTransaction(accountId: Number, amount: Number, dateToday: String, type: String){
    this._transactionService.newTransaction(accountId, amount, dateToday, type).subscribe(() => {
    }, (error) => {
        this.alertify.error('Error completing transaction');
    });
  }

  makeTransfer(){
    var newBalanceSender: number = Number(this.sender.amount)-Number(this.transferMyAccountForm.controls.price.value);
    this._accountService.updateAmount(this.sender, newBalanceSender).subscribe( () => {
      this.alertify.success('Sender amount updated');
      this.createTransaction(this.sender.id, this.transferMyAccountForm.controls.price.value, this.dateFormatted, "Transfer");
      var newBalanceReceiver: number = Number(this.receiver.amount) + Number(this.amountToSend);
      this._accountService.updateAmount(this.receiver, newBalanceReceiver).subscribe( () => {
        this.alertify.success('Receiver amount updated');
        this.createTransaction(this.receiver.id, this.amountToSend, this.dateFormatted, "Received transfer");
      }, () => {
        this.alertify.error('Error during transfer');
      });
    }, () => {
      this.alertify.error('Error during transfer');
    });


    this.dialogRef.close();
    // window.location.reload();
  }

}
