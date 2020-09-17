import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { customerLoginComponent } from './components/customerLogin/customerLogin.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { AccountListComponent } from './components/accounts/account-list/account-list.component';
import { ManagerLoginComponent } from './components/manager-login/manager-login.component';
import { TransactionsComponent } from './components/dialog/transactions/transactions.component';
import { AddclientComponent } from './components/addclient/addclient.component';
import { OpenaccountComponent } from './components/openaccount/openaccount.component';
import { ClientListComponent } from './components/clients/client-list/client-list.component';
import { AccountDetailsComponent } from './components/accounts/account-details/account-details.component';
import { ManageTransactionsComponent } from './components/manage-transactions/manage-transactions.component';
import { CustomerRegisterComponent } from './components/customer-register/customer-register.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'newAccount/:id', component: RegisterComponent},
  {path: 'managerLogin', component: ManagerLoginComponent},
  {path: 'customerLogin', component: customerLoginComponent},
  {path: 'myAccount/:id', component: AccountListComponent},
  {path: 'myAccount/:clientid/transactions/:id', component: TransactionsComponent},
  {path: 'managerLogin/addClient', component: AddclientComponent},
  {path: 'managerLogin/openAccount', component: OpenaccountComponent},
  {path: 'managerLogin/clients', component: ClientListComponent},
  {path: 'managerLogin/:id/details', component: AccountDetailsComponent},
  {path: 'managerLogin/accounts/:id/transactions', component: ManageTransactionsComponent},
  {path: 'customerRegister', component: CustomerRegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
