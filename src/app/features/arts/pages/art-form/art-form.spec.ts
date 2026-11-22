import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtForm } from './art-form';

describe('ArtForm', () => {
  let component: ArtForm;
  let fixture: ComponentFixture<ArtForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
