import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { signal } from '@angular/core';
import { GetAmortizacionUseCase } from '../../../application/get-amortizacion.usecase';
import { CuotaAmortizacion } from '../../../domain/models/credito.model';
import { AmortizacionTableComponent } from '../amortizacion-table/amortizacion-table.component';

@Component({
  selector: 'app-cuotas-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    AmortizacionTableComponent
  ],
  templateUrl: './cuotas-dialog.component.html',
  styleUrls: ['./cuotas-dialog.component.scss']
})
export class CuotasDialogComponent implements OnInit {
  private getAmortizacionUseCase = inject(GetAmortizacionUseCase);
  private dialogRef = inject(MatDialogRef<CuotasDialogComponent>);
  data = inject<{ creditoId: string }>(MAT_DIALOG_DATA);

  cuotas = signal<CuotaAmortizacion[]>([]);
  loading = signal(true);
  error = signal(false);

  ngOnInit(): void {
    this.getAmortizacionUseCase.execute(this.data.creditoId).subscribe({
      next: (cuotas) => {
        this.cuotas.set(cuotas);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(true);
        this.loading.set(false);
      }
    });
  }

  cerrar(): void {
    this.dialogRef.close();
  }
}
