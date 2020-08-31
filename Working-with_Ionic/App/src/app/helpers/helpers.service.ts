import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class HelperService {

	MODULE = 'HelperService';

	log(func, line = '') {
		console.log(this.MODULE + '::' + func + '|' + line);
	}

	init(module: string) {
		this.MODULE = module;
	}

}
