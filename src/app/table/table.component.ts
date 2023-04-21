import { Component, OnInit, Input ,SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  searchEmployee = ""
  @Input() employeeData: any[] = []
  filteredEmployeeData:any[] =[]
  rangeData: any[] = []

 

//  data is fetched asynchronously from an API, child component is being rendered before the data is available,
// To solve this, we can use the Angular ngOnChanges() 
  ngOnChanges(changes: SimpleChanges) {
    if (changes) {
      // Handle changes to the employeeData array
    this.filteredEmployeeData = [...this.employeeData].sort((a:any,b:any) => a.id - b.id)
    const oldestEmployee = this.filteredEmployeeData.sort((a:any,b:any)=> b.employee_age - a.employee_age)[0]
    const oldestAge = oldestEmployee.employee_age;
    const agerangeDifference = 20
    const agerangeSize = Math.ceil(oldestAge / agerangeDifference);
    
    for (let i = 0; i < agerangeSize; i++) {
      let ageRangeStart = i * agerangeDifference + 1
      let ageRangeEnd = (i + 1) * agerangeDifference
      this.rangeData.push(`${ageRangeStart}-${ageRangeEnd}`)
    }
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
