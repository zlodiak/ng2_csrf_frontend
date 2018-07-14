import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Config } from '../config';

@Injectable()
export class TokensService {

  constructor(private httpClient: HttpClient) { }

  transferMoney(moneyAccout, csrfToken): Observable<Object> {
  	const transferObject = {
  		moneyAccout: moneyAccout, 
  		csrfmiddlewaretoken: csrfToken,
  	};
    
		let headers = new HttpHeaders();
		headers = headers
			.set('Content-Type', 'application/json; charset=utf-8')
			.set('X-XSRF-TOKEN', csrfToken);

    return this.httpClient.post(Config.host + 'csrf/transfer_money', transferObject, {headers: headers});
  }

}
