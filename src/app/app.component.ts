import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'employee';

  employeeData: any[] = []

  constructor(public http: HttpClient) { }
  ngOnInit(): void {
    this.getEmployeesData()
  }



  async getEmployeesData() {
    try {
      // const response: any = await this.http.get('https://dummy.restapiexample.com/api/v1/employees').toPromise();
      const response: any = await this.http.get('assets/employeesData.json').toPromise();
      if (response.status == 'success') {
        this.employeeData = response['data'];
      }
    } catch (error) {
      console.error(error);
    }

    console.log(this.employeeData);

  }


}
