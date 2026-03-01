import { Routes } from '@angular/router';
import { ClienteRepository } from './domain/ports/cliente.repository';
import { ClienteHttpRepository } from './infrastructure/adapters/cliente-http.repository';
import { GetClienteUseCase } from './application/get-cliente.usecase';
import { ListClientesUseCase } from './application/list-clientes.usecase';
import { CreateClienteUseCase } from './application/create-cliente.usecase';
import { ClientesShellComponent } from './presentation/clientes-shell.component';

export const CLIENTES_ROUTES: Routes = [
  {
    path: '',
    component: ClientesShellComponent,
    providers: [
      { provide: ClienteRepository, useClass: ClienteHttpRepository },
      GetClienteUseCase,
      ListClientesUseCase,
      CreateClienteUseCase
    ],
    children: [
      {
        path: '',
        loadComponent: () => import('./presentation/pages/cliente-list/cliente-list.component').then(m => m.ClienteListComponent)
      },
      {
        path: 'nuevo',
        loadComponent: () => import('./presentation/pages/cliente-form/cliente-form.component').then(m => m.ClienteFormComponent)
      },
      {
        path: ':id',
        loadComponent: () => import('./presentation/pages/cliente-detail/cliente-detail.component').then(m => m.ClienteDetailComponent)
      }
    ]
  }
];
