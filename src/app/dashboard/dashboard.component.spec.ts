import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { LoginComponent} from '../login/login.components';

import {FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import {Router, Routes, RouterModule} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

const config: Routes = [
  { path: 'login', component: LoginComponent }
];

// test the dashboard component
describe('DashboardComponent', () => {
  let app: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        LoginComponent
      ],
      imports: [
        FormsModule,
        HttpModule,
        RouterModule,
        RouterTestingModule.withRoutes(config)
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  })

  it('should create the app', async(() => {
    expect(app).toBeTruthy();
  }));

  it('should render user settings in h5 tag', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h5').textContent).toContain('User Settings');
  }));

});
