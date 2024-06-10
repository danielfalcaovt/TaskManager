import '../styles/components/notes.css'
import { useContext, useState } from "react"
import { DataContext } from "../context/data/data-context"
import postNotes from '../http/data/notes/post-notes'
import Cookies from 'js-cookie'
import getNotes from '../http/data/notes/get-notes'

export default function Notes() {
  const [note, setNote] = useState({noteTitle: '', noteText: ''})
  const [noteLength, setNoteLength] = useState()
  const {data, setData} = useContext(DataContext)
  const token = Cookies.get('token')

  async function handleNotes (evt) {
    evt.preventDefault()
    const dbResponse = await postNotes(note, token)
    if (dbResponse) {
      const allNotes = await getNotes(token)
      setNote({noteTitle: '', noteText: ''})
      setData((oldValue) => {
        return {
          ...oldValue,
          notes: allNotes.data
        }
      })
      return false
    } else {
      return false
    }
  }

  function handleChange(evt) {
    if (evt.target.id === 'noteTitle' && evt.target.value.length >= 50) {
      return false
    }
    if (evt.target.id === 'noteText' && evt.target.value.length > 255) {
      return false
    }
    evt.target.id === 'noteText' ? setNoteLength(255 - (evt.target.value.length)) : ''
    setNote((oldValue) => {
      return {
        ...oldValue,
        [evt.target.id]: evt.target.value
      }
    })
  }

  return (
    <section id="notes">
      <div id="notes-container-title">
        <form id='note-form' method="POST" onSubmit={handleNotes}>
          <input onChange={handleChange} value={note.noteTitle} autoFocus type="text" required minLength={2} maxLength={50} placeholder="Criar uma nota" id='noteTitle' name="noteTitle"/>
          <textarea onChange={handleChange} value={note.noteText} rows={4} cols={50} required minLength={2} maxLength={255} placeholder='Texto...' id='noteText' name='noteText' />
          <span>{noteLength}</span>
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
              <path d="M21.0477 3.05293C18.8697 0.707363 2.48648 6.4532 2.50001 8.551C2.51535 10.9299 8.89809 11.6617 10.6672 12.1581C11.7311 12.4565 12.016 12.7625 12.2613 13.8781C13.3723 18.9305 13.9301 21.4435 15.2014 21.4996C17.2278 21.5892 23.1733 5.342 21.0477 3.05293Z" stroke="currentColor" stroke-width="1.5" />
              <path d="M11.5 12.5L15 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </form>
      </div>
      <div id="notes-container">
        <div id="notes-receiver">
          {
            data.notes && data.notes.map((note) => {
              return (
                <div className="note" key={note.noteId}>
                  <h1>{note.note_title}</h1>
                  <p>{note.note_text}</p>
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
