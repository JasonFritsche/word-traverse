import { TestBed } from '@angular/core/testing';
import { IndividualConfig, ToastrService } from 'ngx-toastr';

import { ToasterService } from './toaster.service';

describe('ToasterService', () => {
  let service: ToasterService;
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: ToastrService, useValue: toastrService }],
    });
    service = TestBed.inject(ToasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
