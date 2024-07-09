/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useState } from "react";
import RemoveButton from "../elements/buttons/RemoveButton";
import deleteAllTasks from "../../api/http/data/tasks/delete-all-tasks";
import { DataContext } from "../../../infrastructure/context/data/data-context";
import DeleteModal from "../elements/modal/delete-modal";
import { useNavigate } from "react-router-dom";
import deleteAllNotes from "../../api/http/data/notes/delete-notes-all";

export default function Config() {
  const navigate = useNavigate()
  const {data, setData} = useContext(DataContext)
  const [removeFunction, setRemoveFunction] = useState({
    remove: () => {},
    target: ''
  }) // Função que o modal usa para remover
  const [modalDisplay, setModal] = useState("invisible")

  async function removeTasks() {
    if (!data.user) {
      closeModal()
      return false
    }
    const { token, user: { id } } = data
    console.log('tarefas')
    if (token && id) {
      const deletedTasks = await deleteAllTasks(token, id, true)
      if (deletedTasks.status === 200) {
        setData((oldValue: any) => {
          oldValue.tasks = []
          delete oldValue.selectedTasks
          return {
            ...oldValue
          }
        })
        closeModal()
        navigate('/')
      }
    } 
  }

  async function removeNotes() {
    if (!data.user) {
      closeModal()
      return false
    }
    const { token, user: { id } } = data
    console.log('notas')
    if (token && id) {
      const deletedNotes = await deleteAllNotes(token, id, true)
      if (deletedNotes.status === 200) {
        setData((oldValue: any) => {
          oldValue.notes = []
          return {
            ...oldValue
          }
        })
        closeModal()
        navigate('/')
      }
    } 
  }

  function OpenModal() {
    setModal("visible")
  }

  function closeModal() {
    setModal("invisible")
  }

  return (
    <>
      <DeleteModal
        removeFunction={removeFunction}
        modalDisplay={modalDisplay}
        closeModal={closeModal}
      />
      <section id="config-container">
        <div id="config-header">
          <h1>Configurações</h1>
        </div>
        <div id="tasks-config">
          <h2>
            Deletar todas as tarefas
          </h2>
          <RemoveButton 
            onClick={() => {
              if (data.tasks.length > 0) {
                setRemoveFunction({
                  remove: removeTasks,
                  target: 'tasks'
                })
                OpenModal()
              }
            }}
          />
        </div>
        <div id="notes-config">
          <h2>
            Deletar todas as notas
          </h2>
          <RemoveButton 
            onClick={() => {
              if (data.notes.length > 0) {
                setRemoveFunction({
                  remove: removeNotes,
                  target: 'notes'
                })
                OpenModal()
              }
            }}
          />
        </div>
      </section>
    </>
    // Botão para remover todas as notes
    // Botão para remover todas as Tarefas
    // Botão para alterar cor do dia selecionado
  );
}
