// ------------------------------------------------------------------------------
//  Model: EmployeeRequest
//  Description: Structure of employee data to send to backend API
//  Author: Ahmad Alzafiri
// ------------------------------------------------------------------------------

export interface EmployeeRequest {
    name: string;
    preferredWorkDays: number[];
    preferredShift: number;
  }
  