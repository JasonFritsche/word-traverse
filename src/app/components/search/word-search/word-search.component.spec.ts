import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MaterialModule } from 'src/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ReactiveFormsModule } from '@angular/forms';

import { WordSearchComponent } from './word-search.component';

describe('WordSearchComponent', () => {
  let component: WordSearchComponent;
  let fixture: ComponentFixture<WordSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WordSearchComponent],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MaterialModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WordSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('has searchOptions field set to disabled when the form is initially loaded', () => {
    expect(component.wordSearchForm.get('searchOptions')?.disabled).toBe(true);
  });
});
