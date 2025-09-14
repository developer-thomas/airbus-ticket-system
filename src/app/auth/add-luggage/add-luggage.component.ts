import { CommonModule, Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { UploadService } from '@core/services/upload.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, map } from 'rxjs';
import { Load, LoadService } from '../load.service';

@Component({
  selector: 'app-add-luggage',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatCardModule,
    MatSelectModule,
    MatIconModule,
  ],
  templateUrl: './add-luggage.component.html',
  styleUrls: ['./add-luggage.component.scss'],
})
export default class AddLuggageComponent {
  flights$!: Observable<any[]>;
  @Input() loadId: any;
  loadForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private upload: UploadService,
    private service: LoadService,
    public location: Location
  ) {}

  ngOnInit(): void {
    this.buildAircraftForm();
    this.findAllFlights();
    if (this.loadId) {
      this.getLoad();
    }
  }

  buildAircraftForm() {
    this.loadForm = this.fb.group({
      image: ['', Validators.required],
      imageKey: ['', Validators.required],

      name: ['', Validators.required],
      size: ['', Validators.required],
      amountLuggage: ['', Validators.required],
      contentType: ['', Validators.required],

      flightId: ['', Validators.required],
      description: ['', Validators.required],

      type: ['Objeto', Validators.required],

      estimatedTime: ['', Validators.required],
      weightPackage: ['', Validators.required],
      wightTotal: ['', Validators.required],
      additionalNotes: ['', Validators.required],
    });
  }

  get image() {
    return this.loadForm.get('image')?.value;
  }

  uploadFile(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    this.upload.uploadFile(file).subscribe({
      next: (response) => {
        this.loadForm.get('image')?.patchValue(response.file);
        this.loadForm.get('imageKey')?.patchValue(response.fileKey);
      },
    });
  }

  getLoad() {
    this.service.getLoad(this.loadId).subscribe({
      next: (response) => {
        const load = response.luggages[0];

        this.loadForm.get('name')?.patchValue(load.name);
        this.loadForm.get('size')?.patchValue(load.size);
        this.loadForm.get('amountLuggage')?.patchValue(load.amountLuggage);
        this.loadForm.get('image')?.patchValue(load.image);
        this.loadForm.get('imageKey')?.patchValue(load.imageKey);
        this.loadForm.get('contentType')?.patchValue(load.contentType);
        this.loadForm.get('description')?.patchValue(load.description);
        this.loadForm.get('flightId')?.patchValue(response.flight.id);
        this.loadForm.patchValue(response);
      },
    });
  }

  findAllFlights() {
    this.flights$ = this.service.findAllFlights({ page: 1, limit: 1000, status: 'Novo', type: 'Todos' })
      .pipe(
        map((data) => {
          console.log('Voos carregados:', data.flights);
          return data.flights;
        })
      );
  }

  submit() {
    const load = this.loadForm.getRawValue();
    load.amountLuggage = Number(load.amountLuggage);

    if (this.loadId) {
      this.updateLoad(load);
    } else {
      this.createLoad(load);
    }
  }

  createLoad(load: Load) {
    const body = {
      ...load,
    };
    console.log('body:', body)
    this.service.createLoad(body).subscribe({
      next: (response) => {
        this.toastr.success('Carga criada com sucesso!');
        // this.toastr.success('Realizaremos a sua cotação e em breve retornaremos. Obrigado');
        this.location.back();
      },
    });
  }

  updateLoad(load: Load) {
    this.service.updateLoad(this.loadId, load).subscribe({
      next: (response) => {
        this.toastr.success('Carga atualizada com sucesso!');
        this.location.back();
      },
    });
  }
}
