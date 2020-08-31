import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { HelperService } from '../helpers/helpers.service';

@Injectable({
	providedIn: 'root'
})
export class ScreenSizeService {
	private ID = 'ScreenSizeService';

	private isDesktop = new BehaviorSubject<boolean>(false);

	constructor(private helper: HelperService) {
		this.helper.init(this.ID);

		this.helper.log('constructor');

	}

	onResize(size) {
		this.helper.log('onResize', 'size=' + size);
		if (size < 568) {
			this.isDesktop.next(false);
		} else {
			this.isDesktop.next(true);
		}
	}

	isDesktopView(): Observable<boolean> {
		this.helper.log('isDesktopView');

		return this.isDesktop.asObservable().pipe(distinctUntilChanged());
	}
}
