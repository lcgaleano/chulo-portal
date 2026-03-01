import { Routes } from '@angular/router';
import { GetDashboardSummaryUseCase } from './application/get-dashboard-summary.usecase';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    providers: [GetDashboardSummaryUseCase],
    children: [
      {
        path: '',
        loadComponent: () => import('./presentation/pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
      }
    ]
  }
];
