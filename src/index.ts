import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChromeFileSystemService} from './chrome-file-system.service';

export * from './chrome-file-system.service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [],
    exports: []
})
export class ChromeFileSystemModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ChromeFileSystemModule,
            providers: [ChromeFileSystemService]
        };
    }
}
