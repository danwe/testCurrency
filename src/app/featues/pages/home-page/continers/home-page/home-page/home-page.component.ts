import { Component, ViewChild , Input, SimpleChanges } from '@angular/core';
import { CurrencyServices } from './../../../../../../core/services/currency.service';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {formatNumber} from '@angular/common';
import { Currency } from 'src/app/core/models/const/currency';
import { ItemService } from 'src/app/core/services/items.service';
import { Item } from 'src/app/core/models/const/item';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent {
  listCurrency: { key: string; value: unknown; }[] = [];
  resultConvert: string = '';
  countItem : number = 0;
  newItem  : Item =
    {dateUpdate:  '',
    id: 1,
    user: '',
    currFrom:  '',
    currTo:  '',
    value: '',
    valueConvert:  ''};

  constructor(private currencyServices: CurrencyServices, private itemService: ItemService) {}
  listItyem : Array<Item>= [];
  mapped = {};
  currencies: Currency  = {
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

  };
  numberChoose: number = 0;
  numberChooseString: string = '';

  fromSelected : { key: string; value: number; } = {
    key: '',
    value: 0
  };

  toSelected : { key: string; value: number; } = {
    key: '',
    value: 0
  };


  ngOnInit(): void {
    this.currencyServices.getAllItems().subscribe(data => {
      this.currencies = data;
      this.mapped = this.currencies.conversion_rates;

     const mapped : {
      key: string;
      value: unknown;
  }[] = Object.entries(this.mapped ).map(([key, value]) => ({key, value  }));

     console.log(mapped);
    this.listCurrency = [...mapped];


    })
  };

  changeNumberCho(event:any) {
    console.log(event);
    this.numberChoose = event;
    this.numberChooseString = formatNumber(Number(    this.numberChoose = event), 'en-US', '1.0-0').toString().toLowerCase() ==  Infinity.toString().toLowerCase() ?  '' : formatNumber(Number(    this.numberChoose = event), 'en-US', '1.0-0');

    this.calculateConvert();

  }

  updateFrom(event: { key: string; value: unknown; }) {
    console.log(event);
    this.fromSelected.key = event.key;
    this.fromSelected.value = event.value as number;
    this.calculateConvert();


  }

  updateTo(event: { key: string; value: unknown; }) {
    console.log(event);
    this.toSelected.key = event.key;
    this.toSelected.value = event.value as number;
    this.calculateConvert();
  }
    //this.onSelectedProductHome();
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  eventClean() {
    location.reload();
  }

  //}

  // onSelectedProductHome() {
  //   this.homeServicesService.setProduct('dan weill');
  // }

  selectedProduct: any;


  onSelectedProduct(product: any) {
    this.selectedProduct = product;
  }
  calculateConvert () {
    this.resultConvert =  formatNumber(Number(1 / this.fromSelected.value * this.numberChoose *  this.toSelected.value), 'en-US', '1.3-5');
    console.log(this.fromSelected.value * this.numberChoose *  this.toSelected.value);
    if ( this.fromSelected.value * this.numberChoose *  this.toSelected.value > 0)  {
      this.itemService.getAllItems().subscribe(data => {
        this.listItyem = data;
        this.newItem.user = '300738267';
        this.newItem.dateUpdate = Date.now().toString();
        this.newItem.currFrom =  this.fromSelected.key.toUpperCase();
        this.newItem.currTo =  this.toSelected.key.toUpperCase();
        this.newItem.value =  this.numberChoose.toString();
        this.newItem.valueConvert =  (1 / this.fromSelected.value * this.numberChoose *  this.toSelected.value).toString();
        this.newItem.id = this.listItyem.length + 1;
        this.itemService.addItems(this.newItem).subscribe(result => {

        } )
      })

    }
  }
}
