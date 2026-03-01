import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe } from '../../../../../shared/pipes/currency-cop.pipe';

@Component({
  selector: 'app-kpi-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, CurrencyPipe],
  templateUrl: './kpi-card.component.html',
  styleUrls: ['./kpi-card.component.scss']
})
export class KpiCardComponent {
  title = input.required<string>();
  value = input.required<number>();
  icon = input<string>('dashboard');
  color = input<'primary' | 'accent' | 'warn'>('primary');
  isCurrency = input<boolean>(false);
}
