import { Component, OnInit, Input, Output } from '@angular/core';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { MatDialog } from '@angular/material';
import { TransferToMyAccountComponent } from '../../dialog/transfer-to-my-account/transfer-to-my-account.component';
import { TransferToOtherAccountComponent } from '../../dialog/transfer-to-other-account/transfer-to-other-account.component';
import { DepositComponent } from '../../dialog/deposit/deposit.component';
import { WithdrawComponent } from '../../dialog/withdraw/withdraw.component';
import { Account } from 'src/app/_models/account';
import { AccountService } from 'src/app/_services/account.service';
import { TransactionsComponent } from 'src/app/components/dialog/transactions/transactions.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-account-item',
  templateUrl: './account-item.component.html',
  styleUrls: ['./account-item.component.css']
})
export class AccountItemComponent implements OnInit {
  @Input() account: Account;
  constructor(private alertify: AlertifyService,
              private router: Router,
              private route: ActivatedRoute,
              private _accountService: AccountService,
              public dialog: MatDialog) { }

  ngOnInit() {
  }
  Transactions(){
    this.router.navigate(['myAccount/' + Number(this.route.snapshot.paramMap.get("id")) + '/transactions/'+ this.account.id]);
  }

  TransferInMyOtherAccount() {
    this.dialog.open(TransferToMyAccountComponent, {
      width: '400px',
      data: {account : this.account}
    });
  }
  TransferInOtherAccount() {
     this.dialog.open(TransferToOtherAccountComponent, {
      width: '400px',
      data: {account: this.account}
    });
  }
  Deposit() {
     this.dialog.open(DepositComponent, {
      width: '400px',
      data: {account: this.account }
    });
  }
  Withdraw() {
     this.dialog.open(WithdrawComponent, {
      width: '400px',
      data: {account: this.account }
    });
  }

  DeleteAccount() {
    if(this.account.amount <= 0){
    this.alertify.confirm('Are you sure you want to delete this account?', () => {
     this._accountService.deleteAccount(this.account.id).subscribe(() => {
      this.alertify.success('Your account has been successfully deleted');
      window.location.reload();
     }, () => {
       this.alertify.error('Error ocurred when deleting account');
     });
    });
    
    }else {
      this.alertify.error('You cannot delete the account if balance is not 0');
    }
  }

}
