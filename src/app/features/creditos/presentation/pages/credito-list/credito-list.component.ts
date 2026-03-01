import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { signal } from '@angular/core';
import { ListCreditosUseCase } from '../../../application/list-creditos.usecase';
import { Credito } from '../../../domain/models/credito.model';
import { CreditoCardComponent } from '../../components/credito-card/credito-card.component';
import { PageHeaderComponent } from '../../../../../shared/components/page-header/page-header.component';
import { EmptyStateComponent } from '../../../../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-credito-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    CreditoCardComponent,
    PageHeaderComponent,
    EmptyStateComponent
  ],
  templateUrl: './credito-list.component.html',
  styleUrls: ['./credito-list.component.scss']
})
export class CreditoListComponent implements OnInit {
  private listCreditosUseCase = inject(ListCreditosUseCase);
  private fb = inject(FormBuilder);

  creditos = signal<Credito[]>([]);
  creditosBuscados = signal<Credito[]>([]);
  loading = signal(false);
  buscando = signal(false);
  hasBuscado = signal(false);
  identificacionBuscada = signal('');

  form = this.fb.group({
    numeroIdentificacion: ['']
  });

  ngOnInit(): void {
    this.loadCreditos();
  }

  private loadCreditos(): void {
    this.loading.set(true);
    this.listCreditosUseCase.execute().subscribe({
      next: (creditos) => {
        this.creditos.set(creditos);
        this.loading.set(false);
      },
      error: () => {
        this.creditos.set([]);
        this.loading.set(false);
      }
    });
  }

  buscarPorIdentificacion(): void {
    const id = this.form.get('numeroIdentificacion')?.value?.trim();
    if (!id || id.length < 3) return;

    this.buscando.set(true);
    this.hasBuscado.set(false);

    this.listCreditosUseCase.executeByClienteId(id).subscribe({
      next: (creditos) => {
        this.creditosBuscados.set(creditos);
        this.identificacionBuscada.set(id);
        this.hasBuscado.set(true);
        this.buscando.set(false);
      },
      error: () => {
        this.creditosBuscados.set([]);
        this.identificacionBuscada.set(id);
        this.hasBuscado.set(true);
        this.buscando.set(false);
      }
    });
  }

  limpiarBusqueda(): void {
    this.form.reset();
    this.hasBuscado.set(false);
    this.identificacionBuscada.set('');
    this.creditosBuscados.set([]);
  }
}
