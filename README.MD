# chrome-file-system-api

## Installation

To install this library, run:

```bash
$ npm install chrome-file-system-api --save
```

and then from your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


@NgModule({
  declarations: [
    
  ],
  imports: [
    BrowserModule,

    // Specify your library as an import
    ChromeFileSystemModule
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
```

## Development

To generate all `*.js`, `*.d.ts` and `*.metadata.json` files:

```bash
$ npm run build
```

To lint all `*.ts` files:

```bash
$ npm run lint
```

## License

MIT © [Davi Leal](mailto:davitleal@outlook.com.br)
