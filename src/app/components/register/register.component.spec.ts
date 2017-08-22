import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RegisterComponent } from './register.component';

import {FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import {Router, Routes, RouterModule} from '@angular/router';


// test the register component
describe('RegisterComponent', () => {
  let app: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RegisterComponent
      ],
      imports: [
        FormsModule,
        HttpModule,
        RouterModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  })

  it('should create the app', async(() => {
    expect(app).toBeTruthy();
    expect(app).toBeDefined();
  }));

  it('should render register title in nav tag', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('nav').textContent).toContain('Bucket List App >> Register');
  }));

});
