import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../employee';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details-employee',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details-employee.component.html',
  styleUrls: ['./details-employee.component.css'],
})
export class DetailsEmployeeComponent {
  id!: number;
  employee!: Employee;

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    try {
      this.employee = await firstValueFrom(
        this.employeeService.detailsEmployee(this.id)
      );
    } catch (error) {
      console.log(error);
      alert('No employee with this id');
    }
  }
}
