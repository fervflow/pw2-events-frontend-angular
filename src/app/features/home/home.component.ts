import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';

import {KeyValuePipe, NgForOf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterLink, RouterLinkActive} from '@angular/router';
// import {DemoRoute} from '@demo/routes';
import {tuiAsPortal, TuiPortals, TuiRepeatTimes} from '@taiga-ui/cdk';
import {
    TuiAppearance,
    TuiButton,
    TuiDataList,
    TuiDropdown,
    TuiDropdownService,
    TuiIcon,
    TuiTitle,
} from '@taiga-ui/core';
import {
    TuiAvatar,
    TuiBadge,
    TuiBadgeNotification,
    TuiChevron,
    TuiDataListDropdownManager,
    TuiFade,
    TuiSwitch,
    TuiTabs,
} from '@taiga-ui/kit';
import {TuiCardLarge, TuiHeader, TuiNavigation} from '@taiga-ui/layout';	 
import { AuthService } from '../../auth/auth.service';

interface SidebarItem {
  icon: string;
  label: string;
  route: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    KeyValuePipe,
    NgForOf,
    RouterLink,
    RouterLinkActive,
    TuiAppearance,
    TuiAvatar,
    TuiBadge,
    TuiBadgeNotification,
    TuiButton,
    TuiCardLarge,
    TuiChevron,
    TuiDataList,
    TuiDataListDropdownManager,
    TuiDropdown,
    TuiFade,
    TuiHeader,
    TuiIcon,
    TuiNavigation,
    TuiRepeatTimes,
    TuiSwitch,
    TuiTabs,
    TuiTitle,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // Ignore portal related code, it is only here to position drawer inside the example block
  providers: [
    // TuiDropdownService,
    // tuiAsPortal(TuiDropdownService),
  ],
})
export class HomeComponent {
  protected expanded = true;
  protected open = false;
  protected switch = false;
  
  selectedSidebarItem: SidebarItem | null = null;

  sidebarItems: SidebarItem[] = [
    { icon: '@tui.contact-round', label: 'Usuarios', route: 'usuarios' },
    { icon: '@tui.users', label: 'Clientes', route: 'clientes' },
    { icon: '@tui.shapes', label: 'Categorías', route: 'categorias' },
    { icon: '@tui.calendar-1', label: 'Eventos', route: 'eventos' },
    { icon: '@tui.notebook-text', label: 'Publicaciones', route: 'publicaciones' },
    { icon: '@tui.ticket', label: 'Ventas', route: 'ventas' },
  ];

  handleSidebarClick(item: SidebarItem) {
    this.selectedSidebarItem = item;
  }

  auth = inject(AuthService);
  logout = () => {
    this.auth.logout();
  };
  
}
