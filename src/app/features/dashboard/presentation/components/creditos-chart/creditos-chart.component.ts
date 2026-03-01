import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { EstadoCredito } from '../../../../creditos/domain/models/estado-credito.enum';
import { DashboardSummary } from '../../../domain/models/dashboard-summary.model';

@Component({
  selector: 'app-creditos-chart',
  standalone: true,
  imports: [CommonModule, MatCardModule, NgChartsModule],
  templateUrl: './creditos-chart.component.html',
  styleUrls: ['./creditos-chart.component.scss']
})
export class CreditosChartComponent {
  summary = input.required<DashboardSummary>();

  get chartData(): ChartConfiguration<'doughnut'>['data'] {
    const summary = this.summary();
    return {
      labels: ['Activo', 'Cancelado', 'En Mora'],
      datasets: [
        {
          data: [
            summary.creditosActivoCount,
            summary.creditosCanceladoCount,
            summary.creditosEnMoraCount
          ],
          backgroundColor: ['#4caf50', '#2196f3', '#f44336'],
          borderColor: ['#388e3c', '#1976d2', '#d32f2f'],
          borderWidth: 2
        }
      ]
    };
  }

  chartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  };
}
