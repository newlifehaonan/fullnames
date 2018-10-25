import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { of} from 'rxjs'; 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  searches: any[];
  firstname: string;
  lastname: string;
  isExist: Boolean;
  constructor(private dashboardService: DashboardService, private db: AngularFireDatabase) {
    this.searches = [];
  }

  searchHistory() {
    this.dashboardService.getSearchHistory().subscribe( (history: any) => {
      this.searches = history;
    });
  }


  addName(firstName: string, lastName: string) {
    this.db.list('names/first-names').set(firstName, true);
    this.db.list('names/last-names').set(lastName, true);
    console.log(firstName + ' ' + lastName + 'added successfully.');
  }

  searchFullName(firstName: string, lastName: string) {
    console.log("searching " + firstName + " " + lastName);
    this.dashboardService.recordSearch(firstName, lastName);
    this.getName(firstName, lastName).subscribe(isExist => {
      this.isExist = isExist;
    });
  }

  getName(firstName: string, lastName: string) {
    var fn = this.db.object('names/first-names/' + firstName).snapshotChanges();
    var ln = this.db.object('names/last-names/' + lastName).snapshotChanges();

    return fn.switchMap(fn1 => 
      ln.switchMap(ln1 => {
        return of((fn1.payload.val() === true) && (ln1.payload.val() === true));
      })
    );
  }
  
  ngOnInit() {
  }

}
