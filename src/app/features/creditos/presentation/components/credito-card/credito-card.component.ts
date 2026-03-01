import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { Credito } from '../../../domain/models/credito.model';
import { CurrencyPipe } from '../../../../../shared/pipes/currency-cop.pipe';
import { EstadoCreditoPipe } from '../../../../../shared/pipes/estado-credito.pipe';

@Component({
  selector: 'app-credito-card',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule, CurrencyPipe, EstadoCreditoPipe],
  templateUrl: './credito-card.component.html',
  styleUrls: ['./credito-card.component.scss']
})
export class CreditoCardComponent {
  credito = input.required<Credito>();

  getEstadoColor(): string {
    const estado = this.credito().estado;
    return estado === 'ACTIVO' ? 'primary' : estado === 'EN_MORA' ? 'warn' : 'accent';
  }
}
