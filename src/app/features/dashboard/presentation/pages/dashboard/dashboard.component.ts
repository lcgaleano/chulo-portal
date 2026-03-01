import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { signal } from '@angular/core';
import { GetDashboardSummaryUseCase } from '../../../application/get-dashboard-summary.usecase';
import { DashboardSummary } from '../../../domain/models/dashboard-summary.model';
import { KpiCardComponent } from '../../components/kpi-card/kpi-card.component';
import { CreditosChartComponent } from '../../components/creditos-chart/creditos-chart.component';
import { PageHeaderComponent } from '../../../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    KpiCardComponent,
    CreditosChartComponent,
    PageHeaderComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private getDashboardSummaryUseCase = inject(GetDashboardSummaryUseCase);

  summary = signal<DashboardSummary | null>(null);
  loading = signal(false);

  ngOnInit(): void {
    this.loading.set(true);
    this.getDashboardSummaryUseCase.execute().subscribe({
      next: (summary) => {
        this.summary.set(summary);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }
}
