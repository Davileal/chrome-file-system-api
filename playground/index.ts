/**
 * This is only for local test
 */
import {BrowserModule} from '@angular/platform-browser';
import {Component, NgModule} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {ChromeFileSystemModule} from 'chrome-file-system-api';

@Component({
    selector: 'app',
    template: `
        <h1>Hello world</h1>`
})
class AppComponent {
}

@NgModule({
    bootstrap: [AppComponent],
    declarations: [AppComponent],
    imports: [BrowserModule, ChromeFileSystemModule]
})
class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);
