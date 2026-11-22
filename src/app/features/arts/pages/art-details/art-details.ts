import { Component, inject, input, signal } from '@angular/core';
import { ArtService } from '../../services/art.service';
import { Observable, switchMap } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Art } from '../../models/art.model';
import { LoadState, withLoadState } from '../../../../shared/load-state';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-art-details',
  imports: [RouterLink, MatButtonModule],
  templateUrl: './art-details.html',
  styleUrl: './art-details.scss',
})
export class ArtDetails {

  private artService = inject(ArtService);
  private readonly router = inject(Router);


  readonly deleting = signal(false);

  readonly deleteError = signal<string | null>(null);

  readonly id = input.required<string>();
  readonly initial: LoadState<Art> = { status: 'loading' };

  state = toSignal(
    toObservable(this.id).pipe(
      switchMap((id) => withLoadState(this.artService.getArtById(id))),
    ),
    { initialValue: this.initial },
  );

  deleteArt(art: Art): void {
    if (!confirm(`Delete ${art.name} ${art.genre}?`)) return;

    this.deleting.set(true);
    this.deleteError.set(null);

    this.artService.deleteArt(art._id).subscribe({
      next: () => this.router.navigate(['/arts']),
      error: (err: Error) => {
        this.deleteError.set(err.message);
        this.deleting.set(false);
      },
    });
  }



}


