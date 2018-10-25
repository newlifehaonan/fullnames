import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  searches: any[];
  firstname: string;
  lastname: string;
  // isFirst: Boolean;
  // isLast:Boolean;
  isExist: Boolean;
  constructor(private dashboardService: DashboardService) {
    this.searches = [];
    this.firstname = "";
    this.lastname = "";
    // this.isFirst = false;
    // this.isLast = false;
    this.isExist = false;
  }

  searchHistory() {
    this.dashboardService.getSearchHistory().subscribe( (history: any) => {
      this.searches = history;
    });
  }

  searchFullName(first: string, last: string) {
    this.dashboardService.getName(first).then(
      snapshot=>{
        let first_names = snapshot.child('first-names');
        let value = first_names.child(first).val();
        if(value != null){
          // this.isFirst = true;
          // console.log(this.isFirst);
          this.dashboardService.getName(last).then(
            snapshot=>{
              let last_names = snapshot.child('last-names');
              let value_1 = last_names.child(last).val();
              if(value_1 != null){
                this.isExist = true;
                // console.log(this.isLast);
                alert(`${first} ${last} is a valid name`);
              }
              else {
                this.isExist = false;
                // console.log(this.isLast);
                alert(`${first} ${last} is an invalid name`);
              }
            }
          );
        }
        else {
          this.isExist = false;
          // console.log(this.lastname);
          alert(`${first} ${last} is an invalid name`);
        }
        console.log(this.isExist);
      }
    );
    // console.log(this.isFirst);

  //   this.dashboardService.getName(last).then(
  //     snapshot=>{
  //       let last_names = snapshot.child('last-names');
  //       let value = last_names.child(last).val();
  //       if(value != null){
  //         this.isLast = true;
  //         // console.log(this.isLast);
  //       }
  //       else {
  //         this.isLast = false;
  //         // console.log(this.isLast);
  //       }
  //     }
  //   );
  //   console.log(this.isLast);

  //   if(this.isFirst && this.isLast){
  //     console.log('exit');
  //   }
  //   else {
  //     console.log('not exit');
  //   }
  // }

  // searchFirstName(first: string){
  //   this.dashboardService.getName(first).then(
  //     snapshot=>{
  //       let first_names = snapshot.child('first-names');
  //       let value = first_names.child(first).val();
  //       if(value != null){
  //         this.isFirst = true;
  //         console.log(this.isFirst);
  //         return true;
  //       }
  //       else {
  //         this.isFirst = false;
  //         console.log(this.lastname);
  //         return false;
  //       }
  //     }
  //   );
  // }


  // searchLastName(last: string){
  //   this.dashboardService.getName(last).then(
  //     snapshot=>{
  //       let last_names = snapshot.child('last-names');
  //       let value = last_names.child(last).val();
  //       if(value != null){
  //         this.isLast = true;
  //         console.log(this.isLast);
  //         return true;
  //       }
  //       else {
  //         this.isLast = false;
  //         console.log(this.isLast);
  //         return false;
  //       }
  //     }
  //   );
  // }
}
  ngOnInit() {
    // this.dashboardService.getFirstname();
  }

}
