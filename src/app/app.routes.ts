import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ImprintComponent } from './components/imprint/imprint.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'impressum', component: ImprintComponent },
    /*{ path: 'datenschutz', component: PrivacyComponent },*/
    { path: '**', redirectTo: '' }
];
