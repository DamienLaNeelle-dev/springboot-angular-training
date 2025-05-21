import { Component } from '@angular/core';
import { Employee } from '../employee';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent {
  employees: Employee[] = [];

  constructor() {}

  ngOnInit(): void {
    this.employees = [
      {
        id: 1,
        firstName: 'Tony',
        lastName: 'Stark',
        emailId: 't.stark@gmail.com',
      },
      {
        id: 2,
        firstName: 'Peter',
        lastName: 'Parker',
        emailId: 'p.parker@gmail.com',
      },
    ];

    console.log(this.employees);
  }
}
