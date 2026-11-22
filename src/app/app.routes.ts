import { Routes } from '@angular/router';
import { ArtList } from './features/arts/pages/art-list/art-list';
import { ArtForm } from './features/arts/pages/art-form/art-form';
import { ArtDetails } from './features/arts/pages/art-details/art-details';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'arts',
        pathMatch: 'full'
    },
    {
        path: 'arts',
        component: ArtList
    },
    {
        path: 'arts/new',
        component: ArtForm

    },
    {
        path: 'arts/:id',
        component: ArtDetails
    },
    {
        path: 'arts/:id/edit',
        component: ArtForm
    }



];
