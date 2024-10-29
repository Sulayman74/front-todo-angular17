import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { Routes } from '@angular/router';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { TaskTableComponent } from './components/task-table/task-table.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    {
        path: 'login',
        component: LoginComponent,
        title: "Login"
    },
    {
        path: 'sign-up',
        component: SignUpComponent,
        title: "Sign Up"
    },
    {
        path: 'todos',
        component: TaskTableComponent,
        title: "Tasks"
    },
    {
        path: '**',
        component: NotFoundComponent,
        title: "404 Not Found"
    }
];
