import { notes } from "./notesData"
import '../styles/components/notes.css'
import { useContext } from "react"
import { DataContext } from "../context/data/data-context"

export default function Notes() {
  const {data, setData} = useContext(DataContext)

  function handleNotes (evt) {
    evt.preventDefault()
  }

  return (
    <section id="notes">
      <div id="notes-container-title">
        <form method="POST" onSubmit={handleNotes}>
          <input type="text" placeholder="Título" />
          <input type="text" placeholder="Criar uma nota" />
        </form>
      </div>
      <div id="notes-container">
        <div id="notes-receiver">
          {
            data.notes && data.notes.map((note) => {
              return (
                <div id="note" key={note.noteId}>
                  <h1>{note.noteTitle}</h1>
                  <p>{note.noteText}</p>
                </div>
              )
            })
          }
          {
            (data.error && !data.notes) && (
              <div id="note">
              <h1>Error</h1>
              <p>{data.error}</p>
            </div>          
            )
          }
        </div>
      </div>
    </section>
  )
};
