import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {
  employeeForm: FormGroup;
  isEdit = false;
  employeeId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.employeeForm = this.createForm();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEdit = true;
        this.employeeId = +id;
        this.loadEmployeeData();
      }
    });
  }

  createForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      salary: ['', [Validators.required, Validators.min(0)]],
      dob: ['', Validators.required]
    });
  }

  loadEmployeeData(): void {
    if (this.employeeId) {
      const employee = this.employeeService.getEmployeeById(this.employeeId);
      if (employee) {
        this.employeeForm.patchValue({
          name: employee.name,
          salary: employee.salary,
          dob: this.formatDate(employee.dob)
        });
      }
    }
  }

  formatDate(date: Date): string {
    return new Date(date).toISOString().split('T')[0];
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const formValue = this.employeeForm.value;
      const employeeData = {
        name: formValue.name,
        salary: Number(formValue.salary),
        dob: new Date(formValue.dob)
      };

      if (this.isEdit && this.employeeId) {
        this.employeeService.updateEmployee(this.employeeId, employeeData);
      } else {
        this.employeeService.addEmployee(employeeData);
      }

      this.router.navigate(['/employees']);
    }
  }

  onCancel(): void {
    this.router.navigate(['/employees']);
  }
}

// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { ActivatedRoute, Router } from '@angular/router';
// import { EmployeeService } from '../../services/employee.service';

// @Component({
//   selector: 'app-employee-form',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule],
//   templateUrl: './employee-form.component.html',
//   styleUrls: ['./employee-form.component.scss']
// })
// export class EmployeeFormComponent implements OnInit {
//   employeeForm: FormGroup;
//   isEdit = false;
//   employeeId?: number;

//   constructor(
//     private fb: FormBuilder,
//     private employeeService: EmployeeService,
//     private router: Router,
//     private route: ActivatedRoute
//   ) {
//     this.employeeForm = this.createForm();
//   }

//   ngOnInit(): void {
//     this.employeeId = this.route.snapshot.params['id'];
//     if (this.employeeId) {
//       this.isEdit = true;
//       this.loadEmployeeData();
//     }
//   }

//   createForm(): FormGroup {
//     return this.fb.group({
//       name: ['', [Validators.required, Validators.minLength(2)]],
//       salary: ['', [Validators.required, Validators.min(0)]],
//       dob: ['', Validators.required]
//     });
//   }

//   loadEmployeeData(): void {
//     const employee = this.employeeService.getEmployeeById(Number(this.employeeId));
//     if (employee) {
//       this.employeeForm.patchValue({
//         name: employee.name,
//         salary: employee.salary,
//         dob: this.formatDate(employee.dob)
//       });
//     }
//   }

//   formatDate(date: Date): string {
//     return new Date(date).toISOString().split('T')[0];
//   }

//   onSubmit(): void {
//     if (this.employeeForm.valid) {
//       const formValue = this.employeeForm.value;
//       const employeeData = {
//         name: formValue.name,
//         salary: Number(formValue.salary),
//         dob: new Date(formValue.dob)
//       };

//       if (this.isEdit && this.employeeId) {
//         this.employeeService.updateEmployee(this.employeeId, employeeData);
//       } else {
//         this.employeeService.addEmployee(employeeData);
//       }

//       this.router.navigate(['/employees']);
//     }
//   }

//   onCancel(): void {
//     this.router.navigate(['/employees']);
//   }
// } 
