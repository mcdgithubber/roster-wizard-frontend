// ------------------------------------------------------------------------------
//  Component: EmployeeFormComponent
//  Description: Form to input employees and their preferences
//  Author: Ahmad Alzafiri
//  Date: 27/04/2025
// ------------------------------------------------------------------------------

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Employee, PreferredShift } from '../../models/employee.model';
import { RosterService } from '../../services/roster.service';
import { Roster } from '../../models/roster.model';
import { EmployeeRequest } from '../../models/employee-request.model';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent {

  employeeName: string = '';
  selectedDays: { [key: string]: boolean } = {};
  preferredShift: PreferredShift | null = null; 
  employees: Employee[] = [];

  roster?: Roster;
  isLoading = false;

  availableEmployees: string[] = [
    'Ahmad Alzafiri',
    'Jack Hernandez',
    'Junior Joseph',
    'Kane Daniels',
    'Amy Kingz',
    'Jason Garfield'
  ];

  constructor(private rosterService: RosterService) {}

  onSelectEmployee(name: string) {
    if (!name) return;
    this.employeeName = name;
  }

  addEmployee() {
    const days = Object.keys(this.selectedDays).filter(day => this.selectedDays[day]);
    
    if (!this.employeeName || days.length === 0 || this.preferredShift === undefined || this.preferredShift === null) {
      alert('Please enter employee name, select at least one day, and choose a preferred shift.');
      return;
    }
  
    // Convert preferredShift enum to 0 or 1
    const shiftValue = this.preferredShift; 
  
    const newEmployee: Employee = {
      name: this.employeeName,
      preferredWorkDays: days,
      preferredShift: shiftValue 
    };
  
    this.employees.push(newEmployee);
  
    // Reset form
    this.employeeName = '';
    this.selectedDays = {};
    this.preferredShift = PreferredShift.AM;
  }
  
  

  mapShift(shift: PreferredShift | number): string {
    return shift === 0 ? 'AM' : 'PM';
  } 

  removeEmployee(index: number) {
    this.employees.splice(index, 1);
  }

  findEmployeesForShift(day: string, shift: number, week: number): string[] {
    if (!this.roster) return [];
  
    const dayNumber = this.dayStringToNumber(day); // Sunday=0, Monday=1...
  
    const startDate = new Date(this.roster.startDate);
    const weekStartDate = new Date(startDate);
    weekStartDate.setDate(startDate.getDate() + (week - 1) * 7);
  
    const weekEndDate = new Date(weekStartDate);
    weekEndDate.setDate(weekStartDate.getDate() + 6);
  
    const employees = this.roster.entries
      .filter(e => {
        const entryDate = new Date(e.workDate);
        const isInWeek =
          entryDate >= weekStartDate &&
          entryDate <= weekEndDate;
  
        const isCorrectDay = entryDate.getDay() === dayNumber;
        const isCorrectShift = (e.employee.preferredShift as unknown as number) === shift;
  
        return isInWeek && isCorrectDay && isCorrectShift;
      })
      .map(e => e.employee.name);
  
    return employees;
  }
  printCalendar() {
    const originalContents = document.body.innerHTML;
    const printContents = document.getElementById('calendarPrint')?.innerHTML;
  
    if (printContents) {
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      location.reload(); // reload after print to restore full app
    }
  }
  
  generateRoster() {
    if (this.employees.length === 0) {
      alert('Please add at least one employee.');
      return;
    }

    
    const transformedEmployees: EmployeeRequest[] = this.employees.map(emp => ({
      name: emp.name,
      preferredWorkDays: emp.preferredWorkDays.map(day => this.dayStringToNumber(day)),
      preferredShift: typeof emp.preferredShift === 'string' ? (emp.preferredShift === 'AM' ? 0 : 1)
      : emp.preferredShift
    }));
  
    this.isLoading = true;
    console.log('🛰 Sending to backend:', transformedEmployees);
    this.rosterService.generateRoster(transformedEmployees).subscribe({
      next: (response) => {
        this.roster = response;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error generating roster', err);
        this.isLoading = false;
      }
    });
  }
  
  // Helper to map day strings to numbers
  dayStringToNumber(day: string): number {
    const map: { [key: string]: number } = {
      'Sunday': 0,
      'Monday': 1,
      'Tuesday': 2,
      'Wednesday': 3,
      'Thursday': 4,
      'Friday': 5,
      'Saturday': 6
    };
    return map[day];
  }
  

  getDaysOfWeek() {
    return [
      'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
    ];
  }
}
