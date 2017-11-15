import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DashboardComponent } from '../dashboard/dashboard.component';
import {LoginComponent} from './login.components';

import {FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import {Router, Routes, RouterModule} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

const config: Routes = [
  { path: 'dashboard', component: DashboardComponent }
];

// test the login component
describe('LoginComponent', () => {
  let app: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

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
    fixture = TestBed.createComponent(LoginComponent);
    app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  })

  it('should create the app', async(() => {
    expect(app).toBeTruthy();
    expect(app).toBeDefined();
  }));

  it('should render login title in nav tag', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('nav').textContent).toContain('Bucket List App >> Login');
  }));

});
