import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { Observable } from 'rxjs';

export type FileResponse = {
  file: string;
  fileKey: string;
  name: string;
};

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private http: HttpClient) {}

  uploadFile(file: File): Observable<FileResponse> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('code', 'ghgbvncv23aklsdmkcmzl239084jdsklmlxzmklm');
    return this.http.post<FileResponse>(`${environment.api}/v1/upload/noAuth`, formData);
  }
}
