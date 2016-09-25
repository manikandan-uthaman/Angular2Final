import {Router, RouterModule} from '@angular/router';

import {HomeComponent} from './home.component';
import {CreateComponent} from './create/create.component';
import {SearchComponent} from './search/search.component';
import {NotFoundComponent} from './shared/not-found.component';

export const routing = RouterModule.forRoot([
    {path: '', component: HomeComponent},
    {path: 'create', component: CreateComponent},
    {path: 'search', component: SearchComponent},
    {path: '**', component: NotFoundComponent}
]);