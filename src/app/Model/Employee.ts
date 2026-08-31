export class Employee {
  employeeId: number;
  employeeName: string;
  employeeEmail: string;
  employeePhone: string;
  employeeaddress: string;
  employeeSalary: number;

  constructor() {
    this.employeeaddress = '';
    this.employeeEmail = '';
    this.employeeId = 0;
    this.employeeName = '';
    this.employeePhone = '';
    this.employeeSalary = 0;
  }
}
