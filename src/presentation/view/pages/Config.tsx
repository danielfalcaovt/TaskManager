import React from "react";
import RemoveButton from "../elements/buttons/RemoveButton";

export default function Config() {

  return (
    <section id="config-container">
      <div id="tasks-config">
        <RemoveButton 
          onClick={() => {
          }}
        />
      </div>
    </section>
    // Botão para remover todas as notes
    // Botão para remover todas as Tarefas
    // Botão para alterar cor do dia selecionado
  );
}
