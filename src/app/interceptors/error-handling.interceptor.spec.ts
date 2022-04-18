import { TestBed } from '@angular/core/testing';
import { IndividualConfig, ToastrService } from 'ngx-toastr';

import { ErrorHandlingInterceptor } from './error-handling.interceptor';

describe('ErrorHandlingInterceptor', () => {
  const toastrService = {
    success: (
      message?: string,
      title?: string,
      override?: Partial<IndividualConfig>
    ) => {},
    error: (
      message?: string,
      title?: string,
      override?: Partial<IndividualConfig>
    ) => {},
  };
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        ErrorHandlingInterceptor,
        { provide: ToastrService, useValue: toastrService },
      ],
    })
  );

  it('should be created', () => {
    const interceptor: ErrorHandlingInterceptor = TestBed.inject(
      ErrorHandlingInterceptor
    );
    expect(interceptor).toBeTruthy();
  });
});
