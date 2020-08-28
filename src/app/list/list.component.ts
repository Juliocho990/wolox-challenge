import { Component, OnInit } from '@angular/core';
import { TechsService } from '../techs.service';
import { Tech } from '../tech';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  listForm: FormGroup;

  techs: Tech[];

  filteredTechs: Tech[];

  desc = true;

  constructor(
    private techsService: TechsService,
    private formBuilder: FormBuilder,
    public auth: AuthService
  ) {
    this.listForm = this.formBuilder.group({
      text2Filter: ['', ],
    });
  }

  ngOnInit() {
    this.getTechs();
    this.listForm.get('text2Filter')
      .valueChanges
      .pipe(
        debounceTime(300),
        tap(_ => console.log('filtering...')),
        switchMap(value => this.filterTechs()
          .pipe(
            finalize(() => console.log('Techs filtered'))
          )
        )
      ).subscribe((filteredTechs: Tech[]) => this.filteredTechs = filteredTechs);
  }

  filterTechs() {
    return of(this.techs.filter((tech: Tech) => {
      if (this.listForm.get('text2Filter').value) {
        return tech.type.toLowerCase().match(this.listForm.get('text2Filter').value.toLowerCase()) ||
          tech.tech.toLowerCase().match(this.listForm.get('text2Filter').value.toLowerCase());
      } else {
        return true;
      }
    }));
  }

  sortTechs() {
    if (this.desc) {
      this.filteredTechs = this.filteredTechs.sort(this.descendingFilter);
      this.techs = this.techs.sort(this.descendingFilter);
    } else {
      this.filteredTechs = this.filteredTechs.sort(this.ascendingFilter);
      this.techs = this.techs.sort(this.ascendingFilter);
    }
  }


  ascendingFilter = (a: Tech, b: Tech) => {
    if (a.tech.toLowerCase() > b.tech.toLowerCase()) {
      return -1;
    }
    if (a.tech.toLowerCase() < b.tech.toLowerCase()) {
      return 1;
    }
    return 0;
  }

  descendingFilter = (a: Tech, b: Tech) => {
    if (a.tech.toLowerCase() < b.tech.toLowerCase()) {
      return -1;
    }
    if (a.tech.toLowerCase() > b.tech.toLowerCase()) {
      return 1;
    }
    return 0;
  }

  getTechs(): void {
    this.techsService.getTechs()
      .subscribe((techs: Tech[]) => {
        this.techs = techs;
        this.filteredTechs = techs;
        this.sortTechs();
      });
  }

}
