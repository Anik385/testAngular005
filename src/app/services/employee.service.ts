
// import { Injectable } from '@angular/core';
// import { Employee } from '../models/employee.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class EmployeeService {
//   private employees: Employee[] = [];
//   private nextId = 1;

//   constructor() { }

//   getAllEmployees(): Employee[] {
//     return this.employees;
//   }

//   getEmployeeById(id: number): Employee | undefined {
//     return this.employees.find(emp => emp.id === id);
//   }

//   addEmployee(employee: Omit<Employee, 'id'>): Employee {
//     const newEmployee: Employee = {
//       ...employee,
//       id: this.nextId++
//     };
//     this.employees.push(newEmployee);
//     return newEmployee;
//   }

//   updateEmployee(id: number, employee: Omit<Employee, 'id'>): boolean {
//     const index = this.employees.findIndex(emp => emp.id === id);
//     if (index !== -1) {
//       this.employees[index] = { ...employee, id };
//       return true;
//     }
//     return false;
//   }

//   deleteEmployee(id: number): boolean {
//     const index = this.employees.findIndex(emp => emp.id === id);
//     if (index !== -1) {
//       this.employees.splice(index, 1);
//       return true;
//     }
//     return false;
//   }
// } 
import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employees: Employee[] = [];
  private nextId = 1;

  constructor() { }

  getAllEmployees(): Employee[] {
    return this.employees;
  }

  getEmployeeById(id: number): Employee | undefined {
    const employee = this.employees.find(emp => emp.id === id);
    console.log('Getting employee by ID:', id, 'Found:', employee);
    return employee;
  }

  addEmployee(employee: Omit<Employee, 'id'>): Employee {
    const newEmployee: Employee = {
      ...employee,
      id: this.nextId++
    };
    this.employees.push(newEmployee);
    console.log('Employee added:', newEmployee);
    return newEmployee;
  }

  updateEmployee(id: number, employee: Omit<Employee, 'id'>): boolean {
    const index = this.employees.findIndex(emp => emp.id === id);
    console.log('Updating employee ID:', id, 'Found at index:', index);
    
    if (index !== -1) {
      this.employees[index] = { ...employee, id };
      console.log('Employee after update:', this.employees[index]);
      return true;
    }
    return false;
  }

  deleteEmployee(id: number): boolean {
    const index = this.employees.findIndex(emp => emp.id === id);
    if (index !== -1) {
      this.employees.splice(index, 1);
      return true;
    }
    return false;
  }
}