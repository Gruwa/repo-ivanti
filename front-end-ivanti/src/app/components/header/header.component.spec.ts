import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import {HeaderComponent} from './header.component';

describe('AppHeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HeaderComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the header component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the logo', () => {
    const logoImg = fixture.debugElement.query(By.css('.header__logo img'));
    expect(logoImg).toBeTruthy();
    expect(logoImg.attributes['alt']).toContain('Logo');
  });

  it('should render all navigation links', () => {
    const navLinks = fixture.debugElement.queryAll(By.css('.header__nav-link'));
    expect(navLinks.length).toBe(component.navLinks().length);
    component.navLinks().forEach((link, idx) => {
      expect(navLinks[idx].nativeElement.textContent.trim()).toBe(link.label);
    });
  });
});
