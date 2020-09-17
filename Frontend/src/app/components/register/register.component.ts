import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/_services/account.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
declare var require: any; 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  accountForm: FormGroup;
  clientId: Number;

  constructor(private _accountService: AccountService,
              private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private alertify: AlertifyService) { }

  ngOnInit() {
    this.clientId = Number(this.route.snapshot.paramMap.get("id"));
    this.accountForm = this.formBuilder.group({
      accountName: [null, [Validators.required, Validators.minLength(3),
                  Validators.maxLength(20)]],
      currencyName: [null, [Validators.required]],
      pinCode: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      amount: [0, [Validators.required]],
      iban: [0, [Validators.required]],
      client: this.formBuilder.group({
        id: [this.clientId]
      })
      });
  }
    onSubmit() {
      const uniqueRandom = require('unique-random');
      const rand = uniqueRandom(1000000000000000, 9000000000000000);
      const preIBAN = "RO06PORL";
      this.accountForm.controls['iban'].setValue(preIBAN+rand());
      console.log(this.accountForm.value);
      this._accountService.newAccount(this.accountForm.value).subscribe(() => {
        this.alertify.success('Account created successfully');
        this.router.navigate(['myAccount/' + this.clientId]);
      }, (error) => {
          this.alertify.error('Make sure your information is correct.');
      });
    }
}
