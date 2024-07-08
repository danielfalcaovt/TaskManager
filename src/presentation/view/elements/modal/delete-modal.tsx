/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext } from "react";
import { DataContext } from "../../../../infrastructure/context/data/data-context";

export default function DeleteModal(props: any) {
    const {data, setData} = useContext(DataContext)
  return (
    <div className={`card ${props.modalDisplay}`}>
      <div className="header">
        <div className="image">
          <svg
            aria-hidden="true"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              strokeLinejoin="round"
              strokeLinecap="round"
            ></path>
          </svg>
        </div>
        <div className="content">
          <span className="title">Deletar todas as tarefas</span>
          <p className="message">
           Você tem certeza que deseja deletar todas as {data.tasks?.length} tarefas encontradas?.
          </p>
        </div>
        <div className="actions">
          <button className="desactivate" type="button" onClick={props.removeTasks}>
            Deletar todas as tarefas
          </button>
          <button className="cancel" type="button" onClick={props.closeModal}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}
