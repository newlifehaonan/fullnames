import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { AngularFireDatabase} from '@angular/fire/database';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { log } from 'util';

@Injectable()
export class DashboardService {
  searchHistoryRef: any;
  // firstName: Observable<any>;
  // lastName: Observable<any>;
  firstname_input: string;
  lastname_input: string;

  firstname_list: string[];
    constructor(
    private loginService: LoginService,
    private db: AngularFireDatabase,
    ) {

    this.searchHistoryRef = this.db.list(`sessions/`);
  }

  getSearchHistory() {
    return this.searchHistoryRef.valueChanges();
  }

  getName(firstname_input: string) {
    const ref = this.db.database.ref("names/names");
    return ref.once('value');
  }

  addToDatabase(firstname: string, lastName: string){
    console.log("adding first name");
    this.db.database.ref("names/names/first-names/").push(
      {
        firstname: true
      }
    );
    console.log("added first name");
    this.db.database.ref("names/names/last-names/").push(
      {
        lastName: true
      }
    )
  }


}
