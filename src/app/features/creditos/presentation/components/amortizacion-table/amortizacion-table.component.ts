import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { CuotaAmortizacion } from '../../../domain/models/credito.model';
import { CurrencyPipe } from '../../../../../shared/pipes/currency-cop.pipe';

@Component({
  selector: 'app-amortizacion-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule, CurrencyPipe],
  templateUrl: './amortizacion-table.component.html',
  styleUrls: ['./amortizacion-table.component.scss']
})
export class AmortizacionTableComponent {
  amortizacion = input.required<CuotaAmortizacion[]>();
  displayedColumns: string[] = ['numeroCuota', 'montoCuota', 'capitalCuota', 'interesCuota', 'mora', 'montoPagado', 'fechaVencimiento', 'estado'];
}
