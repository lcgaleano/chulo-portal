import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardSummary } from '../models/dashboard-summary.model';

export const DASHBOARD_REPOSITORY_TOKEN = new InjectionToken<DashboardRepository>('DashboardRepository');

export abstract class DashboardRepository {
  abstract getSummary(): Observable<DashboardSummary>;
}
