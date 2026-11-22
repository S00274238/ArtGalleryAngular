import { Component, inject, input, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateArtDto } from '../../models/art.model';
import { ArtService } from '../../services/art.service';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { notBlank } from '../../../../shared/validators/not-blank.validator';
import { forbiddenValue } from '../../../../shared/validators/forbiden-value';

@Component({
  selector: 'app-art-form',
  imports: [ReactiveFormsModule, RouterLink, MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatProgressBarModule
  ],
  templateUrl: './art-form.html',
  styleUrl: './art-form.scss',
})
export class ArtForm implements OnInit {
  private formBuilder = inject(FormBuilder);
  private artService = inject(ArtService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);


  readonly id = input<string>();  // note this is optional by default
  readonly currentYear = new Date().getFullYear();

  artForm = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2), notBlank, forbiddenValue]],
    genre: ['', [Validators.required, Validators.minLength(2), notBlank, forbiddenValue]],
    year: this.formBuilder.control<number | null>(null, [Validators.min(1950), Validators.max(this.currentYear + 1),]),
  });


  saving = signal(false);
  saveError = signal<string | null>(null);



  onSubmit(): void {

    if (this.artForm.invalid) {
      this.artForm.markAllAsTouched();
      return;
    }
    const { name, genre, year } = this.artForm.getRawValue();
    const newArt: CreateArtDto = { name, genre, year: year ?? undefined };

    const id = this.id();

    const request = id
      ? this.artService.updateArt(id, newArt)
      : this.artService.addArt(newArt);

    this.saving.set(true);
    this.saveError.set(null);

    request.subscribe({
      next: (response) => {
        this.snackBar.open(`${newArt.name} ${newArt.genre} saved`, 'Close', { duration: 10000 });
        console.log('Art added successfully:', response);
        this.router.navigate(['/arts']);
      },

      error: (err: Error) => {
        this.saveError.set(err.message);
        this.saving.set(false);

      },
    });
  }
  ngOnInit(): void {
    const id = this.id();
    if (!id) return; // adding a new art, nothing to load

    this.artService.getArtById(id).subscribe({
      next: (art) =>
        this.artForm.patchValue({ name: art.name, genre: art.genre, year: art.year ?? null }),
      error: (err: Error) => this.saveError.set(err.message),
    });
  }

}


