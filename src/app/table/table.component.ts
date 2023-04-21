import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  searchEmployee = ""
  @Input() employeeData: any[] = []
  filteredEmployeeData:any[] =[]
  rangeData: any[] = []

  ngOnInit(): void {

    this.filteredEmployeeData = [...this.employeeData]
    const oldestEmployee:any = this.filteredEmployeeData.sort((a:any,b:any)=> b.employee_age - a.employee_age)[0]
    const oldestAge = oldestEmployee.employee_age;
    const agerangeDifference = 20
    const agerangeSize = Math.ceil(oldestAge / agerangeDifference);
    
    for (let i = 0; i < agerangeSize; i++) {
      let ageRangeStart = i * agerangeDifference + 1
      let ageRangeEnd = (i + 1) * agerangeDifference
      this.rangeData.push(`${ageRangeStart}-${ageRangeEnd}`)
    }

  }

  filterOrderBy(event: any) {
    let sortOrder = event.target.value
    this.filteredEmployeeData = this.employeeData.sort((a: any, b: any) =>
    // ternary comparison
      sortOrder === 'asc' ? a.employee_salary - b.employee_salary : b.employee_salary - a.employee_salary
    );
  }

  filterRangeBy(event: any) {
    let range = event.target.value;
    const [start, end] = range.split('-').map(Number);
    this.filteredEmployeeData = this.employeeData.filter(employee =>
      employee.employee_age >= start && employee.employee_age <= end
    );
  }
  

}
