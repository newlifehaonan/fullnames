import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { AngularFireDatabase} from '@angular/fire/database';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

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
    // this.firstName = this.db.list('names/names/first-names').valueChanges();
    // this.lastName = this.db.list('names/names/last-names').valueChanges();
  }

  getSearchHistory() {
    return this.searchHistoryRef.valueChanges();
  }

  async getName(firstname_input: string) {
    const ref = this.db.database.ref("names/names");

    // let result = await ref;
    return ref.once('value');
  }

}
