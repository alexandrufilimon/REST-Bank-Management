import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from "@angular/router";
import { ClientService } from 'src/app/_services/client.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addclient',
  templateUrl: './addclient.component.html',
  styleUrls: ['./addclient.component.css']
})
export class AddclientComponent implements OnInit {
  clientForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private alertify: AlertifyService,
              private router: Router,
              private _clientService: ClientService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.clientForm = this.formBuilder.group({
      firstName: [null, [Validators.required, Validators.min(1)]],
      lastName: [null, [Validators.required, Validators.min(1)]],
      cnp: [null, [Validators.required]],
      poB: [null, [Validators.required]],
      doB: [null, [Validators.required]]
    });
  }
  
  onSubmit() {
    this.clientForm.controls.doB.setValue(new DatePipe('en').transform(this.clientForm.controls.doB.value, 'yyyy-MM-dd'))
    console.log(this.clientForm.controls.doB.value)
    this._clientService.newClient(this.clientForm.value).subscribe(() => {
      this.alertify.success('Client added successfully');
      this.router.navigate(['managerLogin/clients']);
    }, (error) => {
        this.alertify.error('Make sure your information is correct.');
    });
  }
}
