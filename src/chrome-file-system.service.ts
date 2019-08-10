import {Injectable} from '@angular/core';
import {
    FILE_SYSTEM_SIZE,
    PERSISTENT,
    RETURN_TYPE,
    STATUS_INITIAZING,
    STATUS_OK,
    STATUS_REQUESTED_PERMISSION_WITH_ERROR
} from "./chrome-file-system-api.constants";

@Injectable()
export class ChromeFileSystemService {

    private storage: object = {
        quota: 0,
        usage: 0
    };
    private status: string;
    private fs: any;

    constructor() {
        this.status = STATUS_INITIAZING;
        this.requestQuota();
        this.requestFileSystem();
        this.updateUsageAndQuota();
    }

    public createFile(fileName: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.fs.root.getFile(fileName, {create: true, exclusive: true}, (fileEntry) => {
                resolve(fileEntry);
            }, (error) => {
                reject(error);
            });
        });
    }

    public createDirectory(directoryName: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.fs.root.getDirectory(directoryName, {create: true}, (directoryEntry) => {
                console.debug('Directory created:', directoryEntry);
                resolve(directoryEntry);
            }, (error) => {
                reject(error);
            });
        });
    }

    public writeFile(path: string, file: Blob): Promise<any> {
        return new Promise((resolve, reject) => {
            this.fs.root.getFile(path, {create: true}, (fileEntry) => {
                fileEntry.createWriter((fileWriter) => {
                    fileWriter.onwriteend = (e) => {
                        resolve(e);
                    };
                    fileWriter.onerror = (e) => {
                        reject(e);
                    };
                    fileWriter.write(file);
                }, (error) => {
                    reject(error);
                });
            }, (error) => {
                reject(error);
            });
        });
    }

    public readFile(path: string, returnType: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.fs.root.getFile(path, {}, (fileEntry) => {
                fileEntry.file((file) => {
                    const reader = new FileReader();
                    if (returnType === RETURN_TYPE.TEXT) {
                        if (file) {
                            reader.readAsText(file);
                        }
                        reader.onerror = (event) => {
                            reject(event);
                        };
                        reader.onloadend = () => {
                            resolve(reader.result);
                        };
                    } else if (returnType === RETURN_TYPE.BLOB) {
                        resolve(file);
                    }
                });
            });
        });
    }

    public deleteFile(fileName: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.fs.root.getFile(fileName, {create: false}, (fileEntry) => {
                    fileEntry.remove((ev) => {
                        this.updateUsageAndQuota();
                        resolve(ev);
                    }, (error) => {
                        reject(error);
                    });
                }, (error) => reject(error)
            );
        });
    }

    public deleteDirectory(directoryName: string) {
        return new Promise((resolve, reject) => {
            this.fs.root.getDirectory(directoryName, {}, (directoryEntry) => {
                resolve(directoryEntry.removeRecursively(() => console.debug('Directory removed:', directoryName)));
            }, (error) => {
                reject(error);
            });
        });
    }

    private requestQuota(): Promise<any> {
        return new Promise((resolve, reject) => {
            (navigator as any).webkitPersistentStorage.requestQuota(FILE_SYSTEM_SIZE,
                (grantedBytes) => {
                    this.storage['quota'] = grantedBytes;
                    this.status = STATUS_OK;
                    resolve(grantedBytes);
                },
                (error) => {
                    this.status = STATUS_REQUESTED_PERMISSION_WITH_ERROR;
                    reject(error);
                });
        });
    }

    private requestFileSystem(): Promise<any> {
        return new Promise((resolve, reject) => {
            (window as any).webkitRequestFileSystem(PERSISTENT, FILE_SYSTEM_SIZE, (fs) => {
                this.fs = fs;
                resolve();
            }, (error) => {
                reject(error);
            });
        });
    }

    private updateUsageAndQuota(): Promise<any> {
        return new Promise((resolve, reject) => {
            (navigator as any).webkitPersistentStorage.queryUsageAndQuota(
                (usedBytes, grantedBytes) => {
                    this.storage['quota'] = grantedBytes;
                    this.storage['usage'] = usedBytes;
                    resolve();
                }, (error) => {
                    reject(error);
                }
            );
        });
    }

}
