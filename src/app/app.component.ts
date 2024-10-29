import { TuiRoot } from "@taiga-ui/core";
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TuiRoot],
  template: `
    <tui-root>

      <router-outlet></router-outlet>

      <ng-container ngProjectAs="tuiOverContent">
      <!-- Content over app content -->
      </ng-container>
      <ng-container ngProjectAs="tuiOverDialogs">
        <!-- Content over dialogs -->
      </ng-container>
      <ng-container ngProjectAs="tuiOverAlerts">
        <!-- Content over alerts -->
      </ng-container>
      <ng-container ngProjectAs="tuiOverDropdowns">
        <!-- Content over dropdowns -->
      </ng-container>
      <ng-container ngProjectAs="tuiOverHints">
        <!-- Content over hints -->
      </ng-container>
    </tui-root>
  `,
  styles: `@import '@taiga-ui/core/styles/taiga-ui-local.less';`,
})
export class AppComponent { }
