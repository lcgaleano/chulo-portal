import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { signal } from '@angular/core';
import { GetCreditoUseCase } from '../../../application/get-credito.usecase';
import { GetAmortizacionUseCase } from '../../../application/get-amortizacion.usecase';
import { CreditoResponse, CuotaAmortizacion } from '../../../domain/models/credito.model';
import { AmortizacionTableComponent } from '../../components/amortizacion-table/amortizacion-table.component';
import { PageHeaderComponent } from '../../../../../shared/components/page-header/page-header.component';
import { CurrencyPipe } from '../../../../../shared/pipes/currency-cop.pipe';
import { EstadoCreditoPipe } from '../../../../../shared/pipes/estado-credito.pipe';

@Component({
  selector: 'app-credito-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    AmortizacionTableComponent,
    PageHeaderComponent,
    CurrencyPipe,
    EstadoCreditoPipe
  ],
  templateUrl: './credito-detail.component.html',
  styleUrls: ['./credito-detail.component.scss']
})
export class CreditoDetailComponent implements OnInit {
  private getCreditoUseCase = inject(GetCreditoUseCase);
  private getAmortizacionUseCase = inject(GetAmortizacionUseCase);
  private route = inject(ActivatedRoute);

  credito = signal<CreditoResponse | null>(null);
  amortizacion = signal<CuotaAmortizacion[]>([]);
  loading = signal(false);

  ngOnInit(): void {
    this.loading.set(true);
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getCreditoUseCase.execute(id).subscribe({
        next: (credito) => {
          this.credito.set(credito);
          this.loadAmortizacion(id);
        },
        error: () => this.loading.set(false)
      });
    }
  }

  private loadAmortizacion(creditoId: string): void {
    this.getAmortizacionUseCase.execute(creditoId).subscribe({
      next: (amortizacion) => {
        this.amortizacion.set(amortizacion);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }
}
