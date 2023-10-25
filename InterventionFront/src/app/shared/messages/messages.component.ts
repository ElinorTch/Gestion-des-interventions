import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit{

  constructor(private formBuilder : FormBuilder){}
  messageForm = this.formBuilder.group({
    matricule_etudiant: new FormControl(''),
    login_utilisateur: new FormControl(''),
    message: new FormControl('', [Validators.required])
  })

  ngOnInit(): void {
    
  }
  sendMessage(e: Event): void {
    // this.MessagesService.postMessage(this.messageForm.value).toPromise().then((data) => {
    //   this.messageList.push(data);
    //   this.messageForm.reset()
    // })
  }

}
