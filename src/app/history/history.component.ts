import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard/dashboard.service';
import { Observable } from 'rxjs';
import { user} from "../model/user"

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  history_list: any[] = [];

  constructor(private dashboardServices: DashboardService) { 
    this.dashboardServices.getSearchHistory().subscribe(
      item =>{
        console.log(item);
        // let temp = new user(<string>item.userUid, <number>item.time)
        // console.log(temp);
        this.history_list.push(
          item
        );
      }
    );
  }

  ngOnInit(){
    
  }

}
