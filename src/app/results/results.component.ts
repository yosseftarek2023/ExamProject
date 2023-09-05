import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  dataSource: any[] = [];
  displayedColumns: any;

  constructor(private auth: AuthService) {
    this.displayedColumns = ['position', 'name', 'subName', 'degree'];
  }

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents() {
    this.auth.getUsers('students').subscribe((students: any) => {
      if (Array.isArray(students)) {
        this.dataSource = students
          .filter((student) => student.subject && student.subject.length > 0)
          .map((student) => ({
            name: student.name,
            subName: student.subject[0].name, // Access the first object in the 'subject' array
            degree: student.subject[0].degree // Access the first object in the 'subject' array
          }));
        console.log(this.dataSource);
      } else {
        console.error('Invalid data format in API response.');
      }
    });
  }
}
