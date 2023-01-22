import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public saveData(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  public getData(key: string) {
    return localStorage.getItem(key)
  }
  public removeData() {
    localStorage.removeItem('id');
    localStorage.removeItem('email');
    localStorage.removeItem('username');
  }

  public clearData() {
    localStorage.clear();
  }
}