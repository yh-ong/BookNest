import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BookdetailComponent } from './pages/bookdetail/bookdetail.component';
import { BookmarkComponent } from './pages/bookmark/bookmark.component';
import { LoginComponent } from './layouts/login/login.component';
import { RegisterComponent } from './layouts/register/register.component';
import { AuthenticationGuard } from './services/authentication.guard';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'bookdetail/:id', component: BookdetailComponent, canActivate: [AuthenticationGuard] },
  { path: 'bookmark', component: BookmarkComponent, canActivate: [AuthenticationGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
