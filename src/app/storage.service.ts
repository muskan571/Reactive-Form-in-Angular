import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  saveData(storageKey: any, storageData: any) {
    localStorage.setItem(storageKey, storageData);
}

getData(storageKey: any) {
    return localStorage.getItem(storageKey);
}
}
