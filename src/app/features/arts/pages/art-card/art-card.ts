import { Component, input } from '@angular/core';
import { Art } from '../../models/art.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-art-card',
  imports: [RouterLink],
  templateUrl: './art-card.html',
  styleUrl: './art-card.scss',
})
export class ArtCard {
  art = input.required<Art>();
  
  
}
