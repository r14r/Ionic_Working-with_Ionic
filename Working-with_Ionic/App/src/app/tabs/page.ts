import { Component } from '@angular/core';
import { ScreenSizeService } from '../services/screensize.service';
import { HelperService } from '../helpers/helpers.service';

@Component({
	selector: 'app-tabs',
	templateUrl: 'tabs.page.html',
	styleUrls: ['tabs.page.scss']
})
export class TabsPage {
	ID = 'TabsPage';

	isDesktop: boolean;

	constructor(private screensizeService: ScreenSizeService, private helper: HelperService) {
		helper.init(this.ID);

		this.screensizeService.isDesktopView().subscribe(isDesktop => {
			if (this.isDesktop && !isDesktop) {
				// Reload because our routing is out of place
				window.location.reload();
			}

			this.isDesktop = isDesktop;
		});
	}
}
