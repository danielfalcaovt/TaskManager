/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useState } from "react";
import RemoveButton from "../elements/buttons/RemoveButton";
import deleteAllTasks from "../../api/http/data/tasks/delete-all-tasks";
import { DataContext } from "../../../infrastructure/context/data/data-context";
import DeleteModal from "../elements/modal/delete-modal";
import { useNavigate } from "react-router-dom";

export default function Config() {
  const navigate = useNavigate()
  const {data, setData} = useContext(DataContext)
  const [modalDisplay, setModal] = useState("invisible")

  async function removeTasks() {
    if (!data.user) {
      closeModal()
      return false
    }
    const { token, user: { id } } = data
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

  function OpenModal() {
    setModal("visible")
  }

  function closeModal() {
    setModal("invisible")
  }

  return (
    <>
      <DeleteModal 
        removeTasks={removeTasks}
        modalDisplay={modalDisplay}
        closeModal={closeModal}
      />
      <section id="config-container">
        <div id="tasks-config">
          <RemoveButton 
            onClick={() => {
              if (data.tasks.length > 0) {
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
