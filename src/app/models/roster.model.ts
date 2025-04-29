import { Employee } from "./employee.model";

export interface RosterEntry {
  employee: Employee;
  workDate: string;
}

export interface Roster {
  id: string;
  startDate: string;
  entries: RosterEntry[];
}
