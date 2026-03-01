import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { signal } from '@angular/core';
import { CreateCreditoUseCase } from '../../../application/create-credito.usecase';
import { GetClienteUseCase } from '../../../../clientes/application/get-cliente.usecase';
import { NotificationService } from '../../../../../core/services/notification.service';
import { ClienteResponse } from '../../../../clientes/domain/models/cliente.model';
import { PageHeaderComponent } from '../../../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-credito-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    PageHeaderComponent
  ],
  templateUrl: './credito-form.component.html',
  styleUrls: ['./credito-form.component.scss']
})
export class CreditoFormComponent {
  private createCreditoUseCase = inject(CreateCreditoUseCase);
  private getClienteUseCase = inject(GetClienteUseCase);
  private notificationService = inject(NotificationService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  submitting = signal(false);
  buscandoCliente = signal(false);
  clienteEncontrado = signal<ClienteResponse | null>(null);

  form = this.fb.group({
    numeroIdentificacionCliente: ['', [Validators.required, Validators.minLength(5)]],
    monto: ['', [Validators.required, Validators.min(1)]],
    tasaInteres: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
    plazoMeses: ['', [Validators.required, Validators.min(1), Validators.max(360)]],
    fechaDesembolso: [this.hoy(), Validators.required],
    fechaVencimiento: ['', Validators.required]
  });

  private hoy(): string {
    return new Date().toISOString().split('T')[0];
  }

  buscarCliente(): void {
    const id = this.form.get('numeroIdentificacionCliente')?.value;
    if (!id || id.length < 5) return;

    this.buscandoCliente.set(true);
    this.clienteEncontrado.set(null);

    this.getClienteUseCase.executeByIdentificacion(id).subscribe({
      next: (cliente) => {
        this.clienteEncontrado.set(cliente);
        this.buscandoCliente.set(false);
      },
      error: () => {
        this.notificationService.error(`No se encontró cliente con identificación ${id}`);
        this.buscandoCliente.set(false);
      }
    });
  }

  calcularFechaVencimiento(): void {
    const fechaDesembolso = this.form.get('fechaDesembolso')?.value;
    const plazoMeses = Number(this.form.get('plazoMeses')?.value);

    if (fechaDesembolso && plazoMeses > 0) {
      const fecha = new Date(fechaDesembolso + 'T00:00:00');
      fecha.setMonth(fecha.getMonth() + plazoMeses);
      this.form.get('fechaVencimiento')?.setValue(fecha.toISOString().split('T')[0]);
    }
  }

  onSubmit(): void {
    if (!this.form.valid) {
      this.notificationService.warning('Por favor completa todos los campos correctamente');
      return;
    }
    if (!this.clienteEncontrado()) {
      this.notificationService.warning('Debes verificar el cliente antes de crear el crédito');
      return;
    }

    this.submitting.set(true);
    const v = this.form.value;

    this.createCreditoUseCase.execute({
      numeroIdentificacionCliente: v.numeroIdentificacionCliente!,
      monto: Number(v.monto),
      tasaInteres: Number(v.tasaInteres),
      plazoMeses: Number(v.plazoMeses),
      fechaDesembolso: v.fechaDesembolso!,
      fechaVencimiento: v.fechaVencimiento!
    }).subscribe({
      next: (credito) => {
        this.notificationService.success('Crédito creado exitosamente');
        this.submitting.set(false);
        this.router.navigate(['/creditos', credito.id]);
      },
      error: () => {
        this.submitting.set(false);
        this.notificationService.error('Error al crear el crédito');
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/creditos']);
  }
}
