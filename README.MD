# chrome-file-system-api

## Installation

To install this library, run:

```bash
$ npm install chrome-file-system-api --save
```

## Usage

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChromeFileSystemService } from 'chrome-file-system-api';


@NgModule({
  declarations: [
    
  ],
  imports: [
    BrowserModule,
  ],
  providers: [ChromeFileSystemService],
  bootstrap: []
})
export class AppModule { }
```

## Methods

| Method                      | Param              | Description |
| :-------------------------: |:-------------:     | :-----------:
| createFile()                | File name          | Creates a new file |
| createDirectory()           | Directory name     | Creates a new directory |
| writeFile()                 | Path and blob file | Saves a blob file |
| readFile()                  | Path and return type | Reads a file and return a blob or text content (according the return type) |
| deleteFile()                | File name          | Deletes a file by name |
| deleteDirectory()           | Directory Name     | Deletes a directory by directoryName |

## License
MIT © [Davi Leal](mailto:davitleal@outlook.com.br)
