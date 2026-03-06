import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { signal, effect } from '@angular/core';
import { GetClienteUseCase } from '../../../application/get-cliente.usecase';
import { ListCreditosUseCase } from '../../../../creditos/application/list-creditos.usecase';
import { ClienteResponse } from '../../../domain/models/cliente.model';
import { Credito } from '../../../../creditos/domain/models/credito.model';
import { CreditoCardComponent } from '../../../../creditos/presentation/components/credito-card/credito-card.component';
import { PageHeaderComponent } from '../../../../../shared/components/page-header/page-header.component';
import { CurrencyPipe } from '../../../../../shared/pipes/currency-cop.pipe';

@Component({
  selector: 'app-cliente-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    CreditoCardComponent,
    PageHeaderComponent,
    CurrencyPipe
  ],
  templateUrl: './cliente-detail.component.html',
  styleUrls: ['./cliente-detail.component.scss']
})
export class ClienteDetailComponent implements OnInit {
  private getClienteUseCase = inject(GetClienteUseCase);
  private listCreditosUseCase = inject(ListCreditosUseCase);
  private route = inject(ActivatedRoute);

  cliente = signal<ClienteResponse | null>(null);
  creditos = signal<Credito[]>([]);
  loading = signal(false);

  constructor() {
    effect(() => {
      const currentCliente = this.cliente();
      if (currentCliente) {
        this.loadCreditos(currentCliente.id);
      }
    }, { allowSignalWrites: true });
  }

  ngOnInit(): void {
    this.loading.set(true);
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getClienteUseCase.executeByIdentificacion(id).subscribe({
        next: (cliente) => {
          this.cliente.set(cliente);
          this.loading.set(false);
        },
        error: () => this.loading.set(false)
      });
    }
  }

  private loadCreditos(clienteId: string): void {
    this.listCreditosUseCase.executeByClienteId(clienteId).subscribe({
      next: (creditos) => this.creditos.set(creditos),
      error: () => this.creditos.set([])
    });
  }
}
