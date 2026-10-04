# QuickNotes

## Project Setup

### Installation
```sh
npm install
```

### Development

```sh
npm run dev
```
Localhost opens at:   http://localhost:5173/

### Struktur

Die Vue-Komponenten sind für die Darstellung der Benutzeroberfläche und die Verarbeitung von Benutzerinteraktionen zuständig, während die wiederverwendbare Logik für Notizen und den lokalen Speicher in den Composables angesiedelt ist. Diese Trennung sorgt dafür, dass sich die Komponenten auf ihre Kernaufgaben konzentrieren können, und erleichtert die Wiederverwendung, Wartung sowie das Testen der App-Funktionalität. Das gemeinsam genutzte `Note`-Interface unter `src/types` gewährleistet eine konsistente Datenhaltung für Notizen in der gesamten Anwendung.

### Reflexionsfragen

- **Warum darf `NoteCard` die Notiz-Prop nicht selbst verändern, und wie löst ihr das stattdessen?** 
Vue-Props sind Eigentum der übergeordneten Komponente und sollen von Kindkomponenten nicht verändert werden. `NoteCard` sendet stattdessen ein `delete`-Event mit der ID der Notiz; `App.vue` nimmt das Event entgegen und ruft `deleteNote()` aus `useNotes()` auf.

- **Was passiert, wenn zwei Komponenten dasselbe `useNotes()` aufrufen — teilen sie sich die Notizen oder nicht?** Nein, jeder Aufruf erzeugt mit `useLocalStorage()` eine eigene reaktive Notizen-Referenz. Beide greifen zwar auf denselben `localStorage`-Eintrag zu, teilen aber nicht automatisch ihren reaktiven Zustand zur Laufzeit.

- **Wozu dient das `Note`-Interface, wenn der Code auch ohne liefe?** Das Interface beschreibt zur Entwicklungszeit die erwartete Struktur einer Notiz und hilft TypeScript, falsche oder fehlende Felder früh zu erkennen. Es wird zur Laufzeit nicht ausgeführt und ist daher keine Voraussetzung dafür, dass die App funktioniert.