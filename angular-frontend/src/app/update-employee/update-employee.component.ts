import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-update-employee',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css'],
})
export class UpdateEmployeeComponent {
  id!: number;
  employee: Employee = new Employee();
  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    try {
      this.employee = await firstValueFrom(
        this.employeeService.getEmployeeById(this.id)
      );
      console.log(this.employee);
    } catch (error) {
      console.log(error);
    }
  }

  goToEmployeeList() {
    this.router.navigate(['/employees']);
  }

  async onSubmit(): Promise<void> {
    try {
      await firstValueFrom(
        this.employeeService.updateEmployee(this.id, this.employee)
      );
      this.goToEmployeeList();
    } catch (error) {
      console.log(error);
    }
  }
}
