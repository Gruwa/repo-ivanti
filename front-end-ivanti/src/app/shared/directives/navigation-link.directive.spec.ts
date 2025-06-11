import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {NavigationLinkDirective} from './navigation-link.directive';

@Component({
  imports: [
    NavigationLinkDirective
  ],
  template: `<a appNavigationLink href="/test">Test Link</a>`
})
class TestHostComponent {}

describe('AppNavigationLinkDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestHostComponent, NavigationLinkDirective]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const directiveEl = fixture.debugElement.query(By.directive(NavigationLinkDirective));
    expect(directiveEl).toBeTruthy();
  });

  it('should render the link with correct href', () => {
    const anchor = fixture.debugElement.query(By.css('a')).nativeElement;
    expect(anchor.getAttribute('href')).toBe('/test');
    expect(anchor.textContent).toContain('Test Link');
  });
});
