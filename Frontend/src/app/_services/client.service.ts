import { Injectable } from '@angular/core';
import { Client } from 'src/app/_models/client';
import { HttpClient } from '@angular/common/http';
import{ Observable, throwError }   from 'rxjs';
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private baseUrl:string='http://localhost:8080';

  constructor(private httpClient : HttpClient ) { }

  getClients() {
    return this.httpClient.get(this.baseUrl+'/clients').
        pipe(
           map((data: Client[]) => {
             return data;
           }), catchError( error => {
             return throwError( 'Something went wrong!' );
           })
        )
    }

    getClient(clientId : Number){
      return this.httpClient.get(this.baseUrl + '/clients/' + clientId).pipe(
        map((data: Client) => {
          return data;
        }), catchError( error => {
          return throwError( 'Something went wrong!' );
        })
      );
    }

    newClient(clientForm: any){
      return this.httpClient.post(this.baseUrl + '/clients', clientForm);
    }

    updateClient(body: Client){
      return this.httpClient.put(this.baseUrl + '/clients/' + body.id, body);
    }
  
    deleteClient(clientId){
      return this.httpClient.delete(this.baseUrl + '/clients/' + clientId);
    }
}
