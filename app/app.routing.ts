import {Router, RouterModule} from '@angular/router';

import {HomeComponent} from './home.component';
import {CreateComponent} from './create/create.component';
import {SearchComponent} from './search/search.component';
import {LeaveComponent} from './leave/leave.component';
import {TestComponent} from './search/test.component';
import {NotFoundComponent} from './shared/not-found.component';

export const routing = RouterModule.forRoot([
    // {path: '', component: TestComponent},
    {path: '', component: HomeComponent},
    {path: 'create/:id', component: CreateComponent},
    {path: 'create', component: CreateComponent},
    {path: 'search', component: SearchComponent},
    {path: 'leave/:id', component: LeaveComponent},
    {path: '**', component: NotFoundComponent}
]);