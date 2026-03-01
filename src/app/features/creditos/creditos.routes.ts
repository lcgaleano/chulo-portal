import { Routes } from '@angular/router';
import { CreditoRepository } from './domain/ports/credito.repository';
import { CreditoHttpRepository } from './infrastructure/adapters/credito-http.repository';
import { GetCreditoUseCase } from './application/get-credito.usecase';
import { ListCreditosUseCase } from './application/list-creditos.usecase';
import { CreateCreditoUseCase } from './application/create-credito.usecase';
import { GetAmortizacionUseCase } from './application/get-amortizacion.usecase';
import { CreditosShellComponent } from './presentation/creditos-shell.component';
import { ClienteRepository } from '../clientes/domain/ports/cliente.repository';
import { ClienteHttpRepository } from '../clientes/infrastructure/adapters/cliente-http.repository';
import { GetClienteUseCase } from '../clientes/application/get-cliente.usecase';

export const CREDITOS_ROUTES: Routes = [
  {
    path: '',
    component: CreditosShellComponent,
    providers: [
      { provide: CreditoRepository, useClass: CreditoHttpRepository },
      { provide: ClienteRepository, useClass: ClienteHttpRepository },
      GetCreditoUseCase,
      ListCreditosUseCase,
      CreateCreditoUseCase,
      GetAmortizacionUseCase,
      GetClienteUseCase
    ],
    children: [
      {
        path: '',
        loadComponent: () => import('./presentation/pages/credito-list/credito-list.component').then(m => m.CreditoListComponent)
      },
      {
        path: 'nuevo',
        loadComponent: () => import('./presentation/pages/credito-form/credito-form.component').then(m => m.CreditoFormComponent)
      },
      {
        path: ':id',
        loadComponent: () => import('./presentation/pages/credito-detail/credito-detail.component').then(m => m.CreditoDetailComponent)
      }
    ]
  }
];
