import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppEnvironment, environment } from '@environments/environment';


@Component({
  selector: 'gifs-side-menu-header',
  imports: [],
  templateUrl: './side-menu-header.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideMenuHeader {
  envs: AppEnvironment = environment
}
