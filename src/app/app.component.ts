import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { TokensService } from './services/tokens.service';
import { Config } from './config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  formCsrf: FormGroup;

  constructor(private tokensService: TokensService) { }  

  ngOnInit() {
    this.formCsrf = new FormGroup ({
      moneyAccount: new FormControl(null)
    });
   this.getTokenFromServer();
  }
  

  getTokenFromServer() {
    const xhr = new XMLHttpRequest();

    xhr.withCredentials = true;

    xhr.open('GET', Config.host + 'csrf/display_form', true);

    xhr.onload = function() {
      console.log( 'xhr response code:' + xhr.status + xhr.statusText);
      console.log( 'xhr response status:' + xhr.statusText);
      console.log( 'xhr response responseText:', xhr.responseText);
    }

    xhr.onerror = function() {
      console.log( 'ERROR ' + this + xhr.status + xhr.statusText + xhr.responseText);
      console.log( 'xhr response code:' + xhr.status + xhr.statusText);
      console.log( 'xhr response status:' + xhr.statusText);
      console.log( 'xhr response responseText:', xhr.responseText);
      console.dir(this);
    }

    xhr.send();   	
  }


  submitCsrfForm() {
    const moneyAccount = +this.formCsrf.controls['moneyAccount'].value;
    const csrfToken = this.getCookieFromBrowser('csrftoken');

    console.log('moneyAccount:', moneyAccount);
    console.log('csrfToken:', csrfToken);

    this.tokensService.transferMoney(moneyAccount, csrfToken).subscribe(
      (next) => {
        console.log('transfer is successful');
      },
      (error) => {
        console.log('transfer is failed');
      }
    );
  }


  getCookieFromBrowser(name) {
    var matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

}
