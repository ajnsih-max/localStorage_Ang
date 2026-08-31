// import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
// import { Employee } from './Model/Employee';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [RouterOutlet, CommonModule, ReactiveFormsModule],
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.css'
// })
// export class AppComponent {
//   employeeForm!: FormGroup;
//   employeeObj: Employee = new Employee();
//   employeList: Employee[] = [];
//   employeeList: Employee[] = [];
//   isEditMode: boolean = false;

//   constructor() {
//     debugger;
//     this.createForm();
//     const oldData = localStorage.getItem('employeeList');
//     if (oldData !== null) {
//       this.employeeList = JSON.parse(oldData);
//     }
//   }

//   createForm(): void {
//     this.employeeForm = new FormGroup({
//       employeeId: new FormControl(0),
//       employeeName: new FormControl(this.employeeObj.employeeName),
//       employeeEmail: new FormControl(this.employeeObj.employeeEmail),
//       employeePhone: new FormControl(this.employeeObj.employeePhone),
//       employeeaddress: new FormControl(this.employeeObj.employeeaddress),
//       employeeSalary: new FormControl(this.employeeObj.employeeSalary)



//     });
//   }

//   onSave(){
//     debugger;
//     const oldData=localStorage.getItem('employeeList');
//     if(oldData!==null){
//       const parsedData: Employee[] = JSON.parse(oldData);
//       this.employeeForm.controls['employeeId'].setValue(parsedData.length + 1);
//       this.employeeList.unshift(this.employeeForm.value);


//     }else{
//       this.employeeList.unshift(this.employeeForm.value);
//     }


//   }

// }






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
    debugger;
    this.createForm();
    const oldData = localStorage.getItem('employeeList');
    if (oldData !== null) {
      this.employeeList = JSON.parse(oldData);
    }
  }

  createForm(): void {
    this.employeeForm = new FormGroup({
      employeeId: new FormControl(0),
      employeeName: new FormControl(this.employeeObj.employeeName, [Validators.required]),
      employeeEmail: new FormControl(this.employeeObj.employeeEmail, [Validators.required, Validators.email]),
      employeePhone: new FormControl(this.employeeObj.employeePhone, [Validators.required]),
      employeeaddress: new FormControl(this.employeeObj.employeeaddress, [Validators.required]),
      employeeSalary: new FormControl(this.employeeObj.employeeSalary, [Validators.required])
    });
  }

  onSave() {
    debugger;
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

  onEdit(data: Employee) {
    debugger;
    this.isEditMode = true;
    this.employeeForm.patchValue(data);
  }

  onUpdate() {
    debugger;
    const updatedData: Employee = this.employeeForm.value;
    const index = this.employeeList.findIndex(e => e.employeeId === updatedData.employeeId);
    if (index !== -1) {
      this.employeeList[index] = updatedData;
      localStorage.setItem('employeeList', JSON.stringify(this.employeeList));
    }
    this.onReset();
  }

  onDelete(id: number) {
    debugger;
    const isConfirm = confirm('Are you sure you want to delete this employee?');
    if (isConfirm) {
      this.employeeList = this.employeeList.filter(e => e.employeeId !== id);
      localStorage.setItem('employeeList', JSON.stringify(this.employeeList));
      if (this.employeeForm.value.employeeId === id) {
        this.onReset();
      }
    }
  }

  onReset() {
    this.isEditMode = false;
    this.employeeForm.reset({
      employeeId: 0,
      employeeName: '',
      employeeEmail: '',
      employeePhone: '',
      employeeaddress: '',
      employeeSalary: ''
    });
  }
}
