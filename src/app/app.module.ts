import { CUSTOM_ELEMENTS_SCHEMA, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './routing/app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { RegisterComponent } from './pages/register/register.component';
import { httpInterceptorProviders } from './interceptors';
import { ChatComponent } from './components/chat/chat.component';
import { MessageComponent } from './components/chat/conversation/message/message.component';
import { ConversationComponent } from './components/chat/conversation/conversation.component';
import { ChatService } from './services/chat/chat.service';
import { FriendlistComponent } from './components/friendpane/friendlist/friendlist.component';
import { FriendpaneComponent } from './components/friendpane/friendpane.component';
import { NgIconsModule } from '@ng-icons/core';
import { ionAddCircleOutline, ionArrowBack } from '@ng-icons/ionicons';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { ServiceWorkerModule } from '@angular/service-worker';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
    HomePageComponent,
    ChatComponent,
    MessageComponent,
    ConversationComponent,
    FriendlistComponent,
    FriendpaneComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgIconsModule.withIcons({ ionAddCircleOutline, ionArrowBack }),
    BrowserAnimationsModule,
    PickerComponent,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(), // make this true to test notifications (if the app reloads in a loop, just unregister the service worker in the browser)
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [ChatService, CookieService, httpInterceptorProviders],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
