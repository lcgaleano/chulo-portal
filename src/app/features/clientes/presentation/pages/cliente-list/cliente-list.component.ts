import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { signal } from '@angular/core';
import { GetClienteUseCase } from '../../../application/get-cliente.usecase';
import { ClienteResponse } from '../../../domain/models/cliente.model';
import { ClienteCardComponent } from '../../components/cliente-card/cliente-card.component';
import { PageHeaderComponent } from '../../../../../shared/components/page-header/page-header.component';
import { EmptyStateComponent } from '../../../../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ClienteCardComponent,
    PageHeaderComponent,
    EmptyStateComponent
  ],
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.scss']
})
export class ClienteListComponent implements OnInit {
  private getClienteUseCase = inject(GetClienteUseCase);
  private fb = inject(FormBuilder);

  cliente = signal<ClienteResponse | null>(null);
  notFound = signal(false);
  searchPerformed = signal(false);

  form = this.fb.group({
    numeroIdentificacion: ['', [Validators.required, Validators.minLength(3)]]
  });

  ngOnInit(): void {
    // Initial load or empty state
  }

  onSearch(): void {
    if (!this.form.valid) return;

    this.searchPerformed.set(true);
    this.notFound.set(false);
    const numeroIdentificacion = this.form.get('numeroIdentificacion')?.value;

    if (numeroIdentificacion) {
      this.getClienteUseCase.executeByIdentificacion(numeroIdentificacion).subscribe({
        next: (cliente) => {
          this.cliente.set(cliente);
          this.notFound.set(false);
        },
        error: () => {
          this.notFound.set(true);
          this.cliente.set(null);
        }
      });
    }
  }

  onClear(): void {
    this.form.reset();
    this.cliente.set(null);
    this.notFound.set(false);
    this.searchPerformed.set(false);
  }
}
