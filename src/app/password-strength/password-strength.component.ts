import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChange,
} from '@angular/core';

@Component({
  selector: 'app-password-strength',
  styleUrls: ['./password-strength.component.scss'],
  templateUrl: './password-strength.component.html',
})
export class PasswordStrengthComponent implements OnChanges {
  bar0!: string;
  bar1!: string;
  bar2!: string;

  @Input() public passwordToCheck: string | undefined;

  @Output() passwordStrength = new EventEmitter<boolean>();

  private colors = ['red', 'orange', 'green'];

  checkStrength(password: string) {
    let force = 0;
    const regex = /[$-/:-?{-~!"^_@`\[\]]/g;
    const letters = /[A-z]+/.test(password);
    const numbers = /[0-9]+/.test(password);
    const symbols = regex.test(password);

    const flags = [letters, numbers, symbols];

    let passedMatches = 0;
    for (const flag of flags) {
      passedMatches += flag === true ? 1 : 0;
    }

    force += 2 * password.length + (password.length >= 10 ? 1 : 0);
    force += passedMatches * 10;
    force = password.length <= 7 ? Math.min(force, 10) : force;
    force = passedMatches === 1 ? Math.min(force, 20) : force;
    force = passedMatches === 2 ? Math.min(force, 30) : force;
    force = passedMatches === 3 ? Math.min(force, 40) : force;
    console.log(force)
    return force;
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
    const password = changes['passwordToCheck'].currentValue;

    this.setBarColors(3, '#DDD');

    if (password) {
      const color = this.getColor(this.checkStrength(password));
      this.setBarColors(color.index, color.color);

      const pwdStrength = this.checkStrength(password);
      pwdStrength === 40
        ? this.passwordStrength.emit(true)
        : this.passwordStrength.emit(false);
    }
  }

  private getColor(strength: number) {
    let indexFlags = 0;
    let count = 1;
    if (strength === 10) {
      indexFlags = 0;
      count = 3;
    } else if (strength === 20) {
      indexFlags = 0;
      count = 1;
    } else if (strength === 30) {
      indexFlags = 1;
      count = 1;
    } else {
      indexFlags = 2;
      count = 1;
    }
    return {
      index: indexFlags + count,
      color: this.colors[indexFlags],
    };
  }

  private setBarColors(count: number, color: string) {
    for (let i = 0; i < count; i++) {
      (this as any)['bar' + i] = color;
    }
  }
}
