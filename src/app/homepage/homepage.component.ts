import {
  Component,
  ViewEncapsulation,
  HostListener,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomepageComponent implements OnInit, AfterViewInit {
  isSidebarOpened = true;

  constructor(
    private readonly cd: ChangeDetectorRef,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.router.events.filter(e => e instanceof NavigationEnd).subscribe(() => {
      this.checkWindowWidth(window.innerWidth);
    });
  }

  ngAfterViewInit() {
    this.checkWindowWidth(window.innerWidth);
  }

  toggleSidebar() {
    this.isSidebarOpened = !this.isSidebarOpened;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.checkWindowWidth(event.target.innerWidth);
  }

  checkWindowWidth(innerWidth?: number) {
    innerWidth = innerWidth ? innerWidth : window.innerWidth;
    if (innerWidth <= 768) {
      this.isSidebarOpened = false;
      this.cd.detectChanges();
    }
  }
}
