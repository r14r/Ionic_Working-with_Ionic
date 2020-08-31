# Introduction

## Responsive Views

Create

```bash
    ionic g service services/screensize
```

### app/services/screensize.service.ts:

```javascript
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScreensizeService {

  private isDesktop = new BehaviorSubject<boolean>(false);

  constructor() { }

  onResize(size) {    
    if (size < 568) {
      this.isDesktop.next(false);
    } else {
      this.isDesktop.next(true);
    }
  }

  isDesktopView(): Observable<boolean> {
    return this.isDesktop.asObservable().pipe(distinctUntilChanged());
  }
}
```

### app/app.component.ts 

Call the function of our service with the new width of the screen:

```javascript
import { Component, HostListener } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ScreensizeService } from './services/screensize.service';

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
    private screensizeService: ScreensizeService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // @NEW
      this.screensizeService.onResize(this.platform.width());
    });
  }

  // @NEW
  @HostListener('window:resize', ['$event'])
  private onResize(event) {
    this.screensizeService.onResize(event.target.innerWidth);
  }
}
```
