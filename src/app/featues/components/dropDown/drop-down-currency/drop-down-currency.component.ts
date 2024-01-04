import { Component ,EventEmitter,Input , Output} from '@angular/core';

@Component({
  selector: 'app-drop-down-currency',
  templateUrl: './drop-down-currency.component.html',
  styleUrls: ['./drop-down-currency.component.scss']
})
export class DropDownCurrencyComponent {
education_level: any;

educationList: any;
selectConfig() {
}
  @Input() rates : { key: string; value: unknown; }[] = [];
  @Output() updateDropdown: EventEmitter<{ key: string; value: unknown; }> = new EventEmitter();
  selected : { key: string; value: unknown; } = {
    key: '',
    value: 0
  };
  ngOnInit(): void {
  }

  educationLevelChangeAction(event: any) {
    this.updateDropdown.emit(event.value);

  }
}
