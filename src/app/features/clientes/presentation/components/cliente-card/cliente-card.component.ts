import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ClienteResponse } from '../../../domain/models/cliente.model';
import { CurrencyPipe } from '../../../../../shared/pipes/currency-cop.pipe';

@Component({
  selector: 'app-cliente-card',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule, MatIconModule, CurrencyPipe],
  templateUrl: './cliente-card.component.html',
  styleUrls: ['./cliente-card.component.scss']
})
export class ClienteCardComponent {
  cliente = input.required<ClienteResponse>();
}
