/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useContext, useState } from "react";
import { DataContext } from "../../../infrastructure/context/data/data-context";
import postNotes from "../../api/http/data/notes/post-notes";
import Cookies from "js-cookie";
import getNotes from "../../api/http/data/notes/get-notes";
import deleteNotes from "../../api/http/data/notes/delete-notes";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import INote from "../../../core/services/note-interface";
import updateNotes from "../../api/http/data/notes/update-notes";

const schema = yup.object().shape({
  noteId: yup.string(),
  noteTitle: yup.string().max(50).required("Título Inválido."),
  noteText: yup.string().max(255).required("Texto Inválido."),
});

interface IUpdateChange {
  note: INote;
  update: boolean;
}

export default function Notes() {
  const { register, handleSubmit, watch, setValue, reset } = useForm({
    resolver: yupResolver(schema),
  });
  const noteText = watch("noteText");
  const { data, setData } = useContext(DataContext);
  const [updateChange, setUpdateChange] = useState<IUpdateChange | undefined>({
    note: {
      user_id: "",
      note_id: "",
      note_text: "",
      note_title: "",
    },
    update: false,
  });
  const token = Cookies.get("token");

  async function handleNotes(receivedNote: any) {
    reset();
    const dbResponse = await postNotes(receivedNote, token);
    if (!dbResponse) {
      return false;
    }
    const allNotes = await getNotes(token);
    setData((oldValue: any) => {
      return {
        ...oldValue,
        notes: allNotes.data,
      };
    });
  }

  async function handleUpdate(receivedNote: any) {
    reset();
    const receivedData = receivedNote;
    receivedData.userId = data.user?.id;
    const dbResponse = await updateNotes(receivedNote, token);
    if (!dbResponse) {
      return false;
    }
    const allNotes = await getNotes(token);
    setData((oldValue: any) => {
      return {
        ...oldValue,
        notes: allNotes.data,
      };
    });
    setUpdateChange(undefined);
    return false;
  }

  async function removeNote(noteId: string) {
    const id = data.user?.id;
    if (!id) {
      return false;
    }
    await deleteNotes({ noteId, userId: id }, token);
    const allNotes = await getNotes(token);
    setData((oldValue: any) => {
      return {
        ...oldValue,
        notes: allNotes.data,
      };
    });
  }

  async function updateNote(updateNote: INote) {
    setValue("noteTitle", updateNote.note_title);
    setValue("noteId", updateNote.note_id);
    updateNote.note_text && setValue("noteText", updateNote.note_text);
    setUpdateChange({ note: updateNote, update: true });
  }

  return (
    <section id="notes">
      <div id="notes-container-title">
        {updateChange?.update ? (
          <>
            <form
              id="note-form"
              method="POST"
              onSubmit={handleSubmit(handleUpdate)}
            >
              <input
                autoFocus
                type="text"
                minLength={2}
                maxLength={50}
                placeholder={updateChange?.note.note_title || "Criar uma nota"}
                id="noteTitle"
                {...register("noteTitle")}
              />
              <textarea
                rows={4}
                cols={50}
                minLength={2}
                maxLength={255}
                placeholder={updateChange?.note.note_text || "Texto..."}
                id="noteText"
                {...register("noteText")}
              />
              <span>{noteText && 255 - noteText?.length}</span>
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  color="#000000"
                  fill="none"
                >
                  <path
                    d="M21.0477 3.05293C18.8697 0.707363 2.48648 6.4532 2.50001 8.551C2.51535 10.9299 8.89809 11.6617 10.6672 12.1581C11.7311 12.4565 12.016 12.7625 12.2613 13.8781C13.3723 18.9305 13.9301 21.4435 15.2014 21.4996C17.2278 21.5892 23.1733 5.342 21.0477 3.05293Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M11.5 12.5L15 9"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </form>
            <button
              onClick={() => {
                setUpdateChange(undefined);
                reset();
              }}
            >
              X
            </button>
          </>
        ) : (
          <form
            id="note-form"
            method="POST"
            onSubmit={handleSubmit(handleNotes)}
          >
            <input
              autoFocus
              type="text"
              required
              minLength={2}
              maxLength={50}
              placeholder={"Criar uma nota"}
              id="noteTitle"
              {...register("noteTitle")}
            />
            <textarea
              rows={4}
              cols={50}
              required
              minLength={2}
              maxLength={255}
              placeholder={"Texto..."}
              id="noteText"
              {...register("noteText")}
            />
            <span>{noteText && 255 - noteText?.length}</span>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                color="#000000"
                fill="none"
              >
                <path
                  d="M21.0477 3.05293C18.8697 0.707363 2.48648 6.4532 2.50001 8.551C2.51535 10.9299 8.89809 11.6617 10.6672 12.1581C11.7311 12.4565 12.016 12.7625 12.2613 13.8781C13.3723 18.9305 13.9301 21.4435 15.2014 21.4996C17.2278 21.5892 23.1733 5.342 21.0477 3.05293Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M11.5 12.5L15 9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </form>
        )}
      </div>
      <div id="notes-container">
        <div id="notes-receiver">
          {data.notes &&
            data.notes.map((note: INote) => {
              return (
                <div className="note" key={note.note_id}>
                  <div id="notes-content">
                    <h1>{note.note_title}</h1>
                    <p>{note.note_text}</p>
                  </div>
                  <div id="notes-config">
                    <button
                      id="delete-note-button"
                      onClick={() => {
                        removeNote(note.note_id);
                      }}
                      name={note.note_id}
                    >
                      Apagar
                    </button>
                    <button
                      id="update-note-button"
                      onClick={() => {
                        updateNote(note);
                      }}
                    >
                      Atualizar
                    </button>
                  </div>
                </div>
              );
            })}
          {data.error && !data.notes && (
            <div id="note">
              <h1>Error</h1>
              <p>{data.error}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
