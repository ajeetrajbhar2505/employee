import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterEmployee'
})
export class FilterEmployeePipe implements PipeTransform {

  transform(employees: any[], search: string): any[] {
    if (!employees || !search) {
      return employees;
    }
    return employees.filter(employee =>
      employee.employee_name.toLowerCase().includes(search.toLowerCase()));
  }

}
