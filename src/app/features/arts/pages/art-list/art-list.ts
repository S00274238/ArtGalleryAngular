import { Component, inject } from '@angular/core';
import { ArtService } from '../../services/art.service';
import { ArtCard } from '../art-card/art-card';
import { toSignal } from '@angular/core/rxjs-interop';
import { LoadState, withLoadState } from '../../../../shared/load-state';


@Component({
  selector: 'app-art-list',
  imports: [ArtCard],
  templateUrl: './art-list.html',
  styleUrl: './art-list.scss',
})


export class ArtList  {

private artService = inject(ArtService);
  
   state = toSignal(withLoadState(this.artService.getArts()), { requireSync: true });
}


