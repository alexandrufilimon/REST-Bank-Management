import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import{ClientService}  from 'src/app/_services/client.service';
import{Client}  from 'src/app/_models/client';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { CustomerRegisterComponent } from 'src/app/components/customer-register/customer-register.component';
import { CustomerAuthComponent } from 'src/app/components/customer-auth/customer-auth.component';

@Component({
  selector: 'app-customerLogin',
  templateUrl: './customerLogin.component.html',
  styleUrls: ['./customerLogin.component.css']
})
export class customerLoginComponent implements OnInit {
  public clients:Client[];

  constructor(public http: HttpClient,
              private _clientService: ClientService,
              private alertify: AlertifyService,
              private fb: FormBuilder,
              public dialog: MatDialog,
              private router: Router) {
               }

  regForm = this.fb.group({
    clientId: ['']
  })

  get clientId(){
    return this.regForm.get('clientId');
  }
              
  ngOnInit() {
    this.getClientList();
  }

  getClientList(){
    this._clientService
    .getClients()
    .subscribe((clients) => {
      console.log(clients);
      this.clients = clients;
    });
  }

  registerClient(){
    this.dialog.open(CustomerRegisterComponent, {
      width: '400px'
    });
  }

  onSubmit() {
      if(this.regForm.get('clientId').value !=0){
        this.dialog.open(CustomerAuthComponent, {
          width: '400px',
          data: {client: this.regForm.get('clientId')}
        });
      }
      else {
        this.alertify.error('Please select a customer');
      }
  }
}
