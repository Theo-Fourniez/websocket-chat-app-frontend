import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ChatMessage } from 'src/app/types/ChatMessage';
import { environment } from 'src/environments/environment.development';
@Injectable()
export class ChatService {
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  getConversationWithUser(username: string): Observable<ChatMessage[]> {
    return this.http.get<ChatMessage[]>(
      environment.baseApiUrl + 'chat/' + username,
    );
  }
}
