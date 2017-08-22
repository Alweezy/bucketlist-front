import {TestBed, async} from '@angular/core/testing';
import {HttpModule, Http, XHRBackend,  BaseRequestOptions} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {AuthenticateService} from './app.service';

// test authenticateService
describe('AuthenticateService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthenticateService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          deps: [MockBackend, BaseRequestOptions],
          useFactory: (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions)
          }
        }
      ],
      imports: [HttpModule],
    });
    TestBed.compileComponents();
  }));

});
