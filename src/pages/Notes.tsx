import { notes } from "./notesData"
import '../styles/components/notes.css'
import { useEffect } from "react"

export default function Notes() {
  return (
    <section id="notes">
      <div id="notes-container-title">
        <h1>Minhas Notas</h1>
      </div>
      <div id="notes-container">
        <div id="notes-receiver">
          {
            notes && notes.map((note) => {
              return (
                <div id="note" key={note.noteId}>
                  <h1>{note.noteTitle}</h1>
                  <p>{note.noteText}</p>
                </div>
              )
            })
          }
        </div>
      </div>
    </section>
  )
};
