import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { TechsService } from '../techs.service';
import { TECHS_DESC, TECHS_ASC, TECHS_FILTERED_BY_A, TECHS_FILTERED_BY_L } from '../../assets/mock-techs';
import { of } from 'rxjs';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let text2FilterInput: HTMLInputElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        RouterTestingModule
      ],
      declarations: [ ListComponent ],
      providers: [
        {
          provide: TechsService,
          useValue: {
            getTechs: () => of(TECHS_DESC)
          }
        }
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should render title in a div tag', () => {
    fixture = TestBed.createComponent(ListComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.title').textContent).toContain('Lista de tecnologías');
  });
  it(`should have as title 'wolox-challenge'`, () => {
    fixture = TestBed.createComponent(ListComponent);
    expect(component.desc).toEqual(true);
  });
  it('should load the techs list in descending order', () => {
    fixture = TestBed.createComponent(ListComponent);
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.filteredTechs).toEqual(TECHS_DESC);
  });
  it('should load the techs list in ascending order', () => {
    fixture = TestBed.createComponent(ListComponent);
    component.ngOnInit();
    fixture.detectChanges();
    component.desc = false;
    component.sortTechs();
    fixture.detectChanges();
    expect(component.filteredTechs).toEqual(TECHS_ASC);
  });
  it('should have \'text2Filter\' as empty string', () => {
    fixture = TestBed.createComponent(ListComponent);
    component.ngOnInit();
    fixture.detectChanges();
    text2FilterInput = fixture.debugElement.nativeElement.querySelector('.filter-form__item');
    fixture.detectChanges();
    expect(text2FilterInput.value).toEqual('');
  });
  it('should update \'text2Filter\' input model', () => {
    fixture = TestBed.createComponent(ListComponent);
    component.ngOnInit();
    fixture.detectChanges();
    text2FilterInput = fixture.debugElement.nativeElement.querySelector('.filter-form__item');
    text2FilterInput.value = 'A';
    text2FilterInput.dispatchEvent(new Event('input'));
    expect(text2FilterInput.value).toEqual('A');
  });
  it('should filter by \'text2Filter\' input model', () => {
    fixture = TestBed.createComponent(ListComponent);
    fixture.detectChanges();
    text2FilterInput = fixture.debugElement.nativeElement.querySelector('.filter-form__item');
    text2FilterInput.value = 'A';
    text2FilterInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.filteredTechs).toBe(TECHS_FILTERED_BY_A);
    });
  });
  it('should filter by \'text2Filter\' input model', () => {
    fixture = TestBed.createComponent(ListComponent);
    fixture.detectChanges();
    text2FilterInput = fixture.debugElement.nativeElement.querySelector('.filter-form__item');
    text2FilterInput.value = 'L';
    text2FilterInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.filteredTechs).toBe(TECHS_FILTERED_BY_L);
    });
  });
});
