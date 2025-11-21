import { Routes } from '@angular/router';
import { ConviteComponent } from './components/convite/convite';
import { AgradecimentoComponent } from './components/agradecimento/agradecimento';

export const routes: Routes = [
  { path: '', component: ConviteComponent },
  { path: 'obrigado', component: AgradecimentoComponent },
  { path: '**', redirectTo: '' }
];