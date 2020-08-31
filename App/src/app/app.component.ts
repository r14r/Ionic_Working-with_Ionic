import { Component, HostListener } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { ScreenSizeService } from './services/screensize.service';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss']
})
export class AppComponent {
	constructor(
		private platform: Platform,
		private splashScreen: SplashScreen,
		private statusBar: StatusBar,
		private screensizeService: ScreenSizeService
	) {
		this.initializeApp();
	}

	initializeApp() {
		this.platform.ready().then(() => {
			this.statusBar.styleDefault();
			this.screensizeService.onResize(this.platform.width());
		});
	}

	@HostListener('window:resize', ['$event'])
	private onResize(event) {
		this.screensizeService.onResize(event.target.innerWidth);
	}
}
