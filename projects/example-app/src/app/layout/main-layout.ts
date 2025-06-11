import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import {
  filter,
  map,
  shareReplay,
  startWith,
  throttleTime,
} from 'rxjs/operators';

interface NavigationItem {
  readonly route: string;
  readonly label: string;
  readonly icon: string;
  readonly tooltip?: string;
}

@Component({
  selector: 'my-org-main-layout',
  imports: [
    AsyncPipe,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTooltipModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
  ],
  template: `
    <mat-sidenav-container
      class="h-screen !bg-[var(--mat-sys-surface-container)]"
    >
      <!-- Navigation Sidenav -->
      <mat-sidenav
        #drawer
        class="!bg-surface-container"
        [class.!w-auto]="(isHandset$ | async) === false"
        [mode]="(isHandset$ | async) ? 'over' : 'side'"
        [opened]="(isHandset$ | async) === false"
        [fixedInViewport]="(isHandset$ | async) || false"
        [fixedTopGap]="(isHandset$ | async) ? 0 : 64"
      >
        <!-- Sidenav Header with Brand -->
        @if (isHandset$ | async) {
          <mat-toolbar>
            <span>Angular workshop</span>
          </mat-toolbar>
        } @else {
          <!-- Rail Mode Header -->
          <div
            class="py-8 border-b border-[var(--mat-sys-outline-variant)] flex justify-center items-center"
          >
            <mat-icon class="text-[var(--mat-sys-primary)]">business</mat-icon>
          </div>
        }

        <!-- Navigation List -->
        @if (isHandset$ | async) {
          <!-- Mobile: Full navigation list -->
          <mat-nav-list class="pt-4 !px-2">
            @for (item of navigationItems; track item.route) {
              <a
                mat-list-item
                [routerLink]="['/', item.route]"
                routerLinkActive
                #rla="routerLinkActive"
                [activated]="rla.isActive"
                (click)="closeDrawerOnMobile(drawer)"
              >
                <mat-icon matListItemIcon>{{ item.icon }}</mat-icon>
                <span matListItemTitle>{{ item.label }}</span>
              </a>
            }
          </mat-nav-list>
        } @else {
          <!-- Desktop: Material 3 Navigation Rail -->
          <nav class="pt-4 px-3">
            @for (item of navigationItems; track item.route) {
              <a
                [routerLink]="['/', item.route]"
                routerLinkActive
                #rla="routerLinkActive"
                class="flex flex-col items-center mb-3 group"
              >
                <div
                  class="w-14 h-8 flex items-center justify-center rounded-full transition-all duration-200"
                  [class.bg-[var(--mat-sys-secondary-container)]]="rla.isActive"
                  [class.text-[var(--mat-sys-on-secondary-container)]]="
                    rla.isActive
                  "
                  [class.text-[var(--mat-sys-on-surface-variant)]]="
                    !rla.isActive
                  "
                  [class.group-hover:bg-[var(--mat-sys-surface-container-highest)]]="
                    !rla.isActive
                  "
                >
                  <mat-icon class="text-2xl">{{ item.icon }}</mat-icon>
                </div>
                <span
                  class="text-xs font-medium text-center leading-tight mt-1 max-w-full"
                  [class.text-[var(--mat-sys-on-surface)]]="rla.isActive"
                  [class.text-[var(--mat-sys-on-surface-variant)]]="
                    !rla.isActive
                  "
                >
                  {{ item.label }}
                </span>
              </a>
            }
          </nav>
        }
      </mat-sidenav>

      <!-- Main Content -->
      <mat-sidenav-content
        class="flex flex-col h-full overflow-hidden"
        [class.p-2]="(isHandset$ | async) === false"
      >
        <div
          class="flex flex-col h-full bg-surface relative"
          [class.p-2]="(isHandset$ | async) === false"
          [class.rounded-xl]="(isHandset$ | async) === false"
        >
          <!-- Top App Bar - Fixed Header -->
          <mat-toolbar
            color="primary"
            class="flex-shrink-0"
            [class.rounded-t-xl]="(isHandset$ | async) === false"
            [class.!border-b]="isScrolled()"
            [class.!border-[var(--mat-sys-outline-variant)]]="isScrolled()"
          >
            @if (isHandset$ | async) {
              <button
                mat-icon-button
                (click)="drawer.toggle()"
                aria-label="Toggle navigation"
              >
                <mat-icon>menu</mat-icon>
              </button>
            }

            <span>{{ currentPageTitle() }}</span>

            <span class="flex-1"></span>

            <!-- Toolbar Actions -->
            <button mat-icon-button matTooltip="Search">
              <mat-icon>search</mat-icon>
            </button>
            <button mat-icon-button matTooltip="Notifications">
              <mat-icon>notifications</mat-icon>
            </button>
            <button
              mat-icon-button
              matTooltip="Account"
              (click)="navigateToSettings()"
              aria-label="Navigate to settings"
            >
              <mat-icon>account_circle</mat-icon>
            </button>
          </mat-toolbar>

          <!-- Page Content - Scrollable Container -->
          <main
            cdkScrollable
            class="flex-1 overflow-y-auto bg-[var(--mat-sys-surface)] text-[var(--mat-sys-on-surface)]"
            [class.p-6]="(isHandset$ | async) === false"
            [class.md:p-8]="(isHandset$ | async) === false"
            [class.p-4]="isHandset$ | async"
          >
            <router-outlet />
          </main>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayout {
  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly router = inject(Router);
  private readonly scrollDispatcher = inject(ScrollDispatcher);

  protected readonly isHandset$ = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  private readonly currentRoute = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event) => (event as NavigationEnd).urlAfterRedirects)
    ),
    { initialValue: this.router.url }
  );

  protected readonly currentNavigationItem = computed(() => {
    const url = this.currentRoute();
    const route = url.replace('/', '');
    return this.navigationItems.find((item) => item.route === route);
  });

  protected readonly currentPageTitle = computed(() => {
    const navigationItem = this.currentNavigationItem();
    return navigationItem?.label || 'Dashboard';
  });

  protected isScrolled = toSignal(
    this.scrollDispatcher.scrolled(100).pipe(
      takeUntilDestroyed(),
      map((scrollable) => {
        const top = scrollable
          ? scrollable.getElementRef().nativeElement.scrollTop
          : 0;
        return top > 0;
      }),
      startWith(false)
    ),
    { initialValue: false }
  );

  constructor() {
    // No need to initialize effect or ngAfterViewInit as computed signals handle updates
  }

  protected readonly navigationItems: readonly NavigationItem[] = [
    {
      route: 'home',
      label: 'Accueil',
      icon: 'home',
      tooltip: "Page d'accueil",
    },
    {
      route: 'dashboard',
      label: 'Dashboard',
      icon: 'dashboard',
      tooltip: 'Dashboard principal',
    },
    {
      route: 'analytics',
      label: 'Analytiques',
      icon: 'analytics',
      tooltip: 'Rapports et analytiques',
    },
    {
      route: 'projects',
      label: 'Projets',
      icon: 'folder',
      tooltip: 'Gestion des projets',
    },
    {
      route: 'team',
      label: 'Équipe',
      icon: 'group',
      tooltip: "Gestion de l'équipe",
    },
    {
      route: 'settings',
      label: 'Paramètres',
      icon: 'settings',
      tooltip: "Paramètres de l'application",
    },
  ] as const;

  protected closeDrawerOnMobile(drawer: { close: () => void }): void {
    if (this.breakpointObserver.isMatched(Breakpoints.Handset)) {
      drawer.close();
    }
  }

  protected navigateToSettings(): void {
    this.router.navigate(['/settings']);
  }

  protected navigateToSettings(): void {
    this.router.navigate(['/settings']);
  }
}
