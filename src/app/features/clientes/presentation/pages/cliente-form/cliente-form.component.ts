import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { signal } from '@angular/core';
import { CreateClienteUseCase } from '../../../application/create-cliente.usecase';
import { NotificationService } from '../../../../../core/services/notification.service';
import { PageHeaderComponent } from '../../../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    PageHeaderComponent
  ],
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.scss']
})
export class ClienteFormComponent {
  private createClienteUseCase = inject(CreateClienteUseCase);
  private notificationService = inject(NotificationService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  submitting = signal(false);

  tiposIdentificacion = [
    { value: 'CC', label: 'Cédula de Ciudadanía' },
    { value: 'CE', label: 'Cédula de Extranjería' },
    { value: 'NIT', label: 'NIT' },
    { value: 'TI', label: 'Tarjeta de Identidad' },
    { value: 'PP', label: 'Pasaporte' }
  ];

  form = this.fb.group({
    tipoIdentificacion: ['', Validators.required],
    numeroIdentificacion: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
    nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    apellido: ['', [Validators.required, Validators.maxLength(100)]],
    email: ['', [Validators.email, Validators.maxLength(150)]],
    telefono: ['', [Validators.maxLength(20)]],
    direccion: ['', [Validators.maxLength(200)]]
  });

  onSubmit(): void {
    if (!this.form.valid) {
      this.notificationService.warning('Por favor completa todos los campos correctamente');
      return;
    }

    this.submitting.set(true);
    this.createClienteUseCase.execute(this.form.value as any).subscribe({
      next: (cliente) => {
        this.notificationService.success(`Cliente ${cliente.nombre} ${cliente.apellido ?? ''} creado exitosamente`);
        this.submitting.set(false);
        this.router.navigate(['/clientes', cliente.numeroIdentificacion]);
      },
      error: () => {
        this.submitting.set(false);
        this.notificationService.error('Error al crear el cliente');
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/clientes']);
  }
}
