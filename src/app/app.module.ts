import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Firebase Module
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './layouts/header/header.component';
import { BookdetailComponent } from './pages/bookdetail/bookdetail.component';
import { BookmarkComponent } from './pages/bookmark/bookmark.component';
import { TruncateTextPipe } from './pipes/truncate-text.pipe';
import { BookService } from './services/book.service';
import { BookmarkService } from './services/bookmark.service';
import { ReviewService } from './services/review.service';
import { LoginComponent } from './layouts/login/login.component';
import { RegisterComponent } from './layouts/register/register.component';
import { AuthenticationService } from './services/authentication.service';
import { AuthenticationGuard } from './services/authentication.guard';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    BookdetailComponent,
    BookmarkComponent,
    TruncateTextPipe,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    BookService,
    BookmarkService,
    ReviewService,
    AuthenticationService,
    AuthenticationGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
