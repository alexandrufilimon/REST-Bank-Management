import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import{ Observable, throwError }   from 'rxjs';
import { Rates } from '../_models/rate';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {

  constructor(private httpClient : HttpClient ) { }

  getRateEURGBP() {
    return this.httpClient.get('https://api.exchangeratesapi.io/latest?base=GBP').
        pipe(
          map((data : Rates) => {
            return data;
          }), catchError( error => {
            return throwError( 'Something went wrong!' );
          })
        )
  }

  getSMS(phone, generatedCode) {
    return this.httpClient.post('https://app.smso.ro/api/v1/send?sender=4&to=+4' + phone + '&body=[UNI BANK] Your code is: ' + generatedCode + '&apiKey=wXvj7mRVnmOeX7DDIg0ABmp6N0POcSmlIDa3Wnii', null).
      pipe(
        map((data : any) => {
          return data;
        }), catchError( error => {
          return throwError( 'Something went wrong!' );
        })
      )
  }

  getRateGBPEUR() {
    return this.httpClient.get('https://api.exchangeratesapi.io/latest?base=EUR').
        pipe(
          map((data : Rates) => {
            return data;
          }), catchError( error => {
            return throwError( 'Something went wrong!' );
          })
        )
  }

}
