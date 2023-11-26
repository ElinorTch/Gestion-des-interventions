import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { MessageService } from 'primeng/api';
import { InterventionsService } from 'src/app/services/others/interventions.service';

@Component({
  selector: 'app-terminer',
  templateUrl: './terminer.component.html',
  styleUrls: ['./terminer.component.scss']
})
export class TerminerComponent implements OnInit {

  @Input() termine: any;
  idDemande: any
  interventionForm!: FormGroup
  files: File[] = [];
  senddingRequest = false
  composantVisible = false;
  submitting = false;
  isUpdating = false

  constructor(private interventionService: InterventionsService, private messageService: MessageService, private formBuilder: FormBuilder, private sanitizer: DomSanitizer) {
    this.idDemande = this.termine


  }
  ngOnInit(): void {
    this.idDemande = this.termine
    this.interventionForm = this.formBuilder.group({
      idDemande: this.idDemande,
      libelleIntervention: new FormControl("Bonjour/Bonsoir très cher(e) étudiant(e) tout le département tient tout premièrement à s'excuser pour le problème que avez rencontré et nous espérons que la solution apportée à ce problème vous convienne... Dans le pire des cas nous ne pourons rien faire de plus pour vous #Nous vous remercions pour votre clémence", [Validators.required]),
      file: new FormControl(),
    })
  }

  terminerIntervention() {
    const formData = new FormData();
    for (const file of this.files) {
      formData.append('file', file, file.name);
    }
    formData.append('idDemande', this.interventionForm.get("idDemande")?.value);
    formData.append('libelleIntervention', this.interventionForm.get("libelleIntervention")?.value);

    this.interventionService.terminerIntervention(formData, this.interventionForm.value.idDemande).subscribe(() => {
      // this.interventionList.push(data);
      this.messageService.add({
        severity: 'success',
        summary: 'Confirmer',
        detail: `Vous venez de terminer complètement avec cette intervention !`,
        life: 3000
      });
      this.interventionForm.reset;
      this.senddingRequest = false
      this.submitting = false
      window.location.reload()
    },
      (res) => {
        this.senddingRequest = false;
        this.messageService.add({ severity: 'info', summary: 'En Cours', detail: 'Vous venez de terminer complètement avec cette intervention !', life: 3000 });
        window.location.reload()
      }
    )
  }

  onFileSelect(event: any): void {
    console.log(event.target.files)
    if (event.target.files.length > 0) {
      this.files = event.target.files;
      this.interventionForm.get('file')?.setValue(this.files);
    }
  }
}
