import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Employee } from './Model/Employee';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  employeeForm!: FormGroup;
  employeeObj: Employee = new Employee();
  employeeList: Employee[] = [];
  isEditMode: boolean = false;

  constructor() {
    this.createForm();
    const oldData = localStorage.getItem('employeeList');
    if (oldData !== null) {
      this.employeeList = JSON.parse(oldData);
    }
  }

  createForm(): void {
    this.employeeForm = new FormGroup({
      employeeId: new FormControl(0),
      employeeName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      employeeEmail: new FormControl('', [Validators.required, Validators.email]),
      employeePhone: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{10}$')
      ]),
      employeeSalary: new FormControl('', [Validators.required, Validators.min(1)]),
      employeeaddress: new FormControl('', [Validators.required])
    });
  }

  // Restricts user input strictly to 10 digits as they type
  onPhoneInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const sanitized = input.value.replace(/[^0-9]/g, '').slice(0, 10);
    this.employeeForm.get('employeePhone')?.setValue(sanitized, { emitEvent: false });
    input.value = sanitized;
  }

  onSave(): void {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    const oldData = localStorage.getItem('employeeList');
    if (oldData !== null) {
      const parsedData: Employee[] = JSON.parse(oldData);
      this.employeeForm.controls['employeeId'].setValue(parsedData.length + 1);
      this.employeeList.unshift(this.employeeForm.value);
      localStorage.setItem('employeeList', JSON.stringify(this.employeeList));
    } else {
      this.employeeForm.controls['employeeId'].setValue(1);
      this.employeeList.unshift(this.employeeForm.value);
      localStorage.setItem('employeeList', JSON.stringify(this.employeeList));
    }

    this.onReset();
  }

  onEdit(data: Employee): void {
    this.isEditMode = true;
    this.employeeForm.patchValue(data);
  }

  onUpdate(): void {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    const updatedData: Employee = this.employeeForm.value;
    const index = this.employeeList.findIndex(e => e.employeeId === updatedData.employeeId);

    if (index !== -1) {
      this.employeeList[index] = updatedData;
      localStorage.setItem('employeeList', JSON.stringify(this.employeeList));
    }

    this.onReset();
  }

  onDelete(id: number): void {
    const isConfirm = confirm('Are you sure you want to delete this employee?');
    if (isConfirm) {
      this.employeeList = this.employeeList.filter(e => e.employeeId !== id);
      localStorage.setItem('employeeList', JSON.stringify(this.employeeList));
      if (this.employeeForm.value.employeeId === id) {
        this.onReset();
      }
    }
  }

  onReset(): void {
    this.isEditMode = false;
    this.employeeForm.reset({
      employeeId: 0,
      employeeName: '',
      employeeEmail: '',
      employeePhone: '',
      employeeSalary: '',
      employeeaddress: ''
    });
  }
}
