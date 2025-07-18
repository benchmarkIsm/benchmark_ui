import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { Header } from './components/header/header';
import { Login } from './components/login/login';
import { CompanyComponent } from './components/company-component/company-component';
import { StatusComponent } from './components/status-component/status-component';
import { JobDescriptionComponent } from './components/job-description-component/job-description-component';
import { JobDescriptionEditComponent } from './components/job-description-component/job-description-edit-component/job-description-edit-component';
import { CandidateComponent } from './components/candidate-component/candidate-component';
import { CandidateEditComponent } from './components/candidate-component/candidate-edit-component/candidate-edit-component';
import { UsersComponent } from './components/users-component/users-component';
import { UserEditComponent } from './components/users-component/user-edit-component/user-edit-component';
import { JobPostingComponent } from './external/job-posting/job-posting';

// export const routes: Routes = [
//   {
//     path: '',
//     redirectTo: '/home',
//     pathMatch: 'full',
//   },
//   {
//     path: 'home',
//     component: JobPostingComponent,
//   },
//   {
//     path: 'login',
//     component: Login,
//   },
//   {
//     path: 'header',
//     component: Header,
//   },
//   {
//     path: 'dashboard',
//     component: Dashboard,
//   },
//   {
//     path: 'company',
//     component: CompanyComponent,
//   },
//   {
//     path: 'jobDesciption',
//     component: JobDescriptionComponent,
//   },
//   {
//     path: 'jdDetails',
//     component: JobDescriptionEditComponent,
//   },
//   {
//     path: 'status',
//     component: StatusComponent,
//   },
//   {
//     path: 'candidate',
//     children: [
//       {
//         path: '',
//         component: CandidateComponent,
//       },
//       {
//         path: 'add',
//         component: CandidateEditComponent,
//       },
//       {
//         path: 'details',
//         component: CandidateEditComponent,
//       },
//     ],
//   },
//   {
//     path: 'user',
//     children: [
//       {
//         path: '',
//         component: UsersComponent,
//       },
//       {
//         path: 'edit',
//         component: UserEditComponent,
//       },
//     ],
//   },
//   { path: '**', redirectTo: '' },
// ];

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: JobPostingComponent,
  },
  {
    path: 'login',
    component: Login, // NO header/sidebar
  },
  {
    path: 'dashboard',
    component: Dashboard,
  },
  {
    path: 'company',
    component: CompanyComponent,
  },
  {
    path: 'jobDesciption',
    component: JobDescriptionComponent,
  },
  {
    path: 'jdDetails',
    component: JobDescriptionEditComponent,
  },
  {
    path: 'status',
    component: StatusComponent,
  },
  {
    path: 'candidate',
    children: [
      {
        path: '',
        component: CandidateComponent,
      },
      {
        path: 'add',
        component: CandidateEditComponent,
      },
      {
        path: 'details',
        component: CandidateEditComponent,
      },
    ],
  },
  {
    path: 'user',
    children: [
      {
        path: '',
        component: UsersComponent,
      },
      {
        path: 'edit',
        component: UserEditComponent,
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
