import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
import { AttachementService } from 'src/app/services/others/attachement.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-details-inervention',
  templateUrl: './details-inervention.component.html',
  styleUrls: ['./details-inervention.component.scss']
})
export class DetailsInerventionComponent implements OnInit {

  details: any;
  yes: any

  @Input() intervention!: any;
  fileNames: string[] = [];
  fileStatus = { status: '', requestType: '', percent: 0 };
  // fichier:any

  constructor(private attachementSrevice: AttachementService) { }

  ngOnInit(): void {
    // this.fichier = `${environment.api}/file/download/${this.intervention.pieceJointe[0].fileName}`
  }

  downloadFile() {
    for (const fichier of this.intervention.pieceJointe) {
      this.attachementSrevice.download(fichier.fileName).subscribe((blob: any) => {
        const link = document.createElement('a');
        // link.href = window.URL.createObjectURL(blob);
        link.download = fichier.fileName;
        link.click();
      });
    }
  }

  // downloadFile() {
  //   for (let fichier of this.intervention.pieceJointe) {
  //     this.attachementSrevice.download(fichier).subscribe(
  //       event => {
  //         console.log(event);
  //         this.reportProgress(event)

  //       }
  //     )
  //   }
  // }

  // private reportProgress(httpEvent: HttpEvent<string[] | Blob>): void {
  //   switch (httpEvent.type) {
  //     case HttpEventType.UploadProgress:
  //       this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Telechargement');
  //       break
  //     case HttpEventType.DownloadProgress:
  //       this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Telechargement');
  //       break
  //     case HttpEventType.ResponseHeader:
  //       console.log('Header retourné', httpEvent);
  //       break
  //     case HttpEventType.Response:
  //       if (httpEvent.body instanceof Array) {
  //         for (const filename of httpEvent.body) {
  //           this.fileNames.unshift(filename)
  //         }
  //       } else {
  //         saveAs(new File([httpEvent.body!], httpEvent.headers.get('File-Name')!,
  //           { type: `${httpEvent.headers.get('content-type')}; charset=utf-8` }))
  //         // saveAs(new Blob([httpEvent.body!],
  //         //   { type: `${httpEvent.headers.get('content-type')}; charset=utf-8` }),
  //         //   httpEvent.headers.get('File-Name'))
  //       }
  //       break
  //     default:
  //       console.log(httpEvent);

  //   }
  // }
  // updateStatus(loaded: number, total: number, requestType: string) {
  //   this.fileStatus.status = 'progress'
  //   this.fileStatus.requestType = requestType
  //   this.fileStatus.percent = Math.round(100 * loaded / total)
  // }

}
