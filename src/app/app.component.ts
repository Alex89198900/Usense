import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { matchpassword } from './matchpassword.validator';
import { defaultPriceValidator } from './price.validator';
import { IProduct } from './product.entity';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  passwordValid($event: boolean) {
    //throw new Error('Method not implemented.');
  }
  title = 'Password Match Validator';

  passwordForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.passwordForm = this.fb.group({
      password: ['', Validators.required],
    });
  }
}
