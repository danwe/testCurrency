import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Currency } from '../models/const/currency';
@Injectable({
  providedIn: 'root'
})
export class CurrencyServices {
  //getAllCurrencyUrl : string = 'http://api.exchangeratesapi.io/v1/latest?access_key=050beeaad0ad5cda72460c6758d5a11e&format=1';
  getAllCurrencyUrl : string = 'https://v6.exchangerate-api.com/v6/95539951db2702fc3a8b2fa7/latest/EUR';

 headers = new HttpHeaders({
	'x-rapidapi-host': 'random-facts2.p.rapidapi.com',
	'x-rapidapi-key': 'your-api-key'
});

  item : Currency = {

    result : '',
    documentation :'',
    terms_of_use  :  '',
    time_last_update_unix :  0,
   time_last_update_utc : '',
   time_next_update_unix: 0,
   time_next_update_utc : '',
   base_code: '',
   conversion_rates:{ key: '', value: 0},

  //  base : '',
  //  date : '',
  //  rates : { key: '', value: 0},
  //  success : false,
  //  timestamp : '',

  }
  constructor(  private http: HttpClient,) { }


  getAllItems(): Observable<any> {
    return this.http.get<any>(this.getAllCurrencyUrl,
  //     {
  //     headers: {'access_key':'050beeaad0ad5cda72460c6758d5a11e','format':'1'}
  //  }

   )
  }

  // addItems(item: Item): Observable<any> {
  //   return this.http.post<any>(this.getAllItemsUrl , item)
  // }

  // editItems(item: Item): Observable<any> {
  //   return this.http.put<any>(this.getAllItemsUrl+ '/' + item.id , item)
  // }
}
