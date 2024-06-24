import '../styles/components/notes.css'
import { useContext, useState } from "react"
import { DataContext } from "../context/data/data-context"
import postNotes from '../http/data/notes/post-notes'
import Cookies from 'js-cookie'
import getNotes from '../http/data/notes/get-notes'
import deleteNotes from '../http/data/notes/delete-notes'

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

  async function removeNote(noteId: string) {
    const { id } = data.user
    await deleteNotes({noteId, userId: id}, token)
    const allNotes = await getNotes(token)
    setData((oldValue) => {
      return {
        ...oldValue,
        notes: allNotes.data
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
                  <button onClick={() => {
                    removeNote(note.note_id)
                  }} name={note.note_id}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                      <path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                      <path d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                      <path d="M9.5 16.5L9.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                      <path d="M14.5 16.5L14.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                    </svg>
                  </button>
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
