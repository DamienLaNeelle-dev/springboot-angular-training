import { Component } from '@angular/core';
import { Employee } from '../employee';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css'],
})
export class CreateEmployeeComponent {
  employee: Employee = new Employee();

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  async saveEmployee() {
    try {
      const data = await firstValueFrom(
        this.employeeService.createEmployee(this.employee)
      );
      console.log(data);
      this.goToEmployeeList();
    } catch (error) {
      console.log(error);
    }
  }

  goToEmployeeList() {
    this.router.navigate(['/employees']);
  }

  onSubmit(): void {
    console.log(this.employee);
    this.saveEmployee();
  }
}
