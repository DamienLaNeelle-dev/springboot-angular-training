import { Component } from '@angular/core';
import { Employee } from '../employee';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent {
  employees: Employee[] = [];

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  private getEmployees() {
    this.employeeService.getEmployeesList().subscribe((data) => {
      this.employees = data;
    });
  }

  updateEmployee(id: number) {
    this.router.navigate(['update-employee', id]);
  }

  async deleteEmployee(id: number): Promise<void> {
    const confirmed = window.confirm('Are you sure to delete this employee?');
    if (!confirmed) return;

    try {
      await firstValueFrom(this.employeeService.deleteEmployee(id));
      this.employees = this.employees.filter((emp) => emp.id !== id);
      alert('Employee deleted with success');
    } catch (error) {
      console.error('Delete error', error);
      alert('Delete error');
    }
  }
}
