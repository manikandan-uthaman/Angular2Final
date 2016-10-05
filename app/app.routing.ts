import {Router, RouterModule} from '@angular/router';

import {HomeComponent} from './home.component';
import {CreateComponent} from './create/create.component';
import {SearchComponent} from './search/search.component';
import {LeaveComponent} from './leave/leave.component';
import {TestComponent} from './search/test.component';
import {NotFoundComponent} from './shared/not-found.component';
import {ConfirmDeactivateComponent} from './confirm-deactivate.component';
import {LoginComponent} from './login/login.component';
import {ReportsComponent} from './reports/reports.component';

export const routing = RouterModule.forRoot([
    // {path: '', component: TestComponent},
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'reports', component: ReportsComponent},
    {path: 'create/:id', component: CreateComponent, canDeactivate: [ConfirmDeactivateComponent]},
    {path: 'create', component: CreateComponent, canDeactivate: [ConfirmDeactivateComponent]},
    {path: 'search', component: SearchComponent},
    {path: 'leave/:id', component: LeaveComponent, canDeactivate: [ConfirmDeactivateComponent]},
    {path: '**', component: NotFoundComponent}
]);