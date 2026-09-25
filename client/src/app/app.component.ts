import { Component, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements AfterViewChecked {
  private apiUrl = 'http://localhost:3002/api/chat';

  @ViewChild('scrollAnchor') private scrollAnchor!: ElementRef;

  messages: ChatMessage[] = [
    { role: 'assistant', content: 'Bonjour ! Je suis l\'assistant TechStore. Posez-moi une question sur la livraison, les retours, le paiement ou la garantie.' },
  ];
  currentInput = '';
  loading = false;

  constructor(private http: HttpClient) {}

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  send() {
    const text = this.currentInput.trim();
    if (!text || this.loading) return;

    this.messages.push({ role: 'user', content: text });
    this.currentInput = '';
    this.loading = true;

    const history = this.messages.slice(0, -1).map((m) => ({ role: m.role, content: m.content }));

    this.http
      .post<{ reply: string }>(this.apiUrl, { message: text, history })
      .subscribe({
        next: (res) => {
          this.messages.push({ role: 'assistant', content: res.reply });
          this.loading = false;
        },
        error: (err) => {
          this.messages.push({
            role: 'assistant',
            content: err?.error?.error || 'Erreur de connexion au serveur.',
          });
          this.loading = false;
        },
      });
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.send();
    }
  }

  private scrollToBottom() {
    try {
      this.scrollAnchor.nativeElement.scrollIntoView({ behavior: 'smooth' });
    } catch {}
  }
}
