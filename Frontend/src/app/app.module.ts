import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { AlertifyService } from './_services/alertify.service';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { customerLoginComponent } from './components/customerLogin/customerLogin.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { AccountListComponent } from './components/accounts/account-list/account-list.component';
import { AccountItemComponent } from './components/accounts/account-item/account-item.component';
import { TransactionsService } from './_services/transactions.service';
import { TransferToMyAccountComponent } from './components/dialog/transfer-to-my-account/transfer-to-my-account.component';
import { TransferToOtherAccountComponent } from './components/dialog/transfer-to-other-account/transfer-to-other-account.component';
import { DepositComponent } from './components/dialog/deposit/deposit.component';
import { WithdrawComponent } from './components/dialog/withdraw/withdraw.component';
import { NumberDirective } from './directive/numbers-only.directive';
import { ManagerLoginComponent } from './components/manager-login/manager-login.component';
import { ClientService } from './_services/client.service';
import { AccountService } from './_services/account.service';
import { TransactionsComponent } from './components/dialog/transactions/transactions.component';
import { ExchangeRateService } from './_services/exchange-rate.service';
import { AddclientComponent } from './components/addclient/addclient.component';
import { OpenaccountComponent } from './components/openaccount/openaccount.component';
import { ClientListComponent } from './components/clients/client-list/client-list.component';
import { AccountDetailsComponent } from './components/accounts/account-details/account-details.component';
import { ManageTransactionsComponent } from './components/manage-transactions/manage-transactions.component';
import { ClientDetailsComponent } from './components/clients/client-details/client-details.component';
import { CustomerRegisterComponent } from './components/customer-register/customer-register.component';
import { ChartModule} from '@syncfusion/ej2-angular-charts';
import { CustomerAuthComponent } from './components/customer-auth/customer-auth.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    RegisterComponent,
    customerLoginComponent,
    ManagerLoginComponent,
    AccountListComponent,
    AccountItemComponent,
    TransferToMyAccountComponent,
    TransferToOtherAccountComponent,
    DepositComponent,
    WithdrawComponent,
    NumberDirective,
    ManagerLoginComponent,
    TransactionsComponent,
    AddclientComponent,
    OpenaccountComponent,
    ClientListComponent,
    AccountDetailsComponent,
    ManageTransactionsComponent,
    ClientDetailsComponent,
    CustomerRegisterComponent,
    CustomerAuthComponent
  ],
  imports: [
    BrowserModule,
    ChartModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  entryComponents: [
    TransferToMyAccountComponent,
    TransferToOtherAccountComponent,
    DepositComponent,
    WithdrawComponent,
    ClientDetailsComponent,
    CustomerAuthComponent
  ],
  providers: [
    AlertifyService,
    TransactionsService,
    ClientService,
    AccountService,
    ExchangeRateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
