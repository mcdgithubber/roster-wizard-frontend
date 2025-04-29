// ------------------------------------------------------------------------------
//  Service: RosterService
//  Description: Communicates with the backend API to generate roster
//  Author: Ahmad Alzafiri
// ------------------------------------------------------------------------------

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Roster } from '../models/roster.model';
import { EmployeeRequest } from '../models/employee-request.model';

@Injectable({
  providedIn: 'root'
})
export class RosterService {

  private readonly apiUrl = 'https://localhost:7043/api/Roster'; // Make sure to match backend port!

  constructor(private http: HttpClient) {}

  generateRoster(employees: EmployeeRequest[]): Observable<Roster> {
    return this.http.post<Roster>(`${this.apiUrl}/generateFromInput`, employees);
  }
}
