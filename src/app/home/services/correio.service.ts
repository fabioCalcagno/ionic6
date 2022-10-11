import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CorreioService {

  public baseUrl:string = "https://proxyapp.correios.com.br";
  private buscarObjetoUrl:string = "/v1/sro-rastro/";

  constructor(private httpClient:HttpClient) { }

  buscarObjeto(codigoObjeto:string){
    let header={
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
      })
    }
    return this.httpClient.get(this.baseUrl+this.buscarObjetoUrl+codigoObjeto, header).toPromise();
  }
}
