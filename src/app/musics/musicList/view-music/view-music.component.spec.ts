import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMusicComponent } from './view-music.component';

describe('ViewMusicComponent', () => {
  let component: ViewMusicComponent;
  let fixture: ComponentFixture<ViewMusicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewMusicComponent]
    });
    fixture = TestBed.createComponent(ViewMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
