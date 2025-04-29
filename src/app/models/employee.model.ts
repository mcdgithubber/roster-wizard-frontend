export enum PreferredShift {
    AM = 'AM',
    PM = 'PM'
  }
  
  export interface Employee {
    name: string;
    preferredWorkDays: string[];
    preferredShift: PreferredShift;
  }
  