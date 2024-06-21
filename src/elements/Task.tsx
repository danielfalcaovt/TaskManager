import { useContext } from "react"
import { DataContext } from "../context/data/data-context"

export default function Task() {
  const { data, setData } = useContext(DataContext)
  return (
    <section id="task-container">
      <div id="task-header">
        <h1>Tarefas</h1>
        <h2 id="task-day"></h2>
      </div>
      <ul className="task-receiver">
      {
       data.selectedTasks 
       ? 
       ( data.selectedTasks && !data.selectedTasks.error ) && data.selectedTasks.map((task) => {
        return (
          <>
            {task && typeof task !== 'string' ?
                  <li className="active-task">
                    <h1 className="active-task-day">{(task.task_day >= 1 && task.task_day <= 9 )?'0':''}{task.task_day}/{(task.task_month >= 1 && task.task_month <= 9 )?'0':''}{task.task_month}</h1>
                    <div className="task-divisor-bar"></div>
                    <div className="active-task-about">
                      <h1>{task.task_name}</h1>
                      <h2>{task.task_text}</h2>
                    </div>
                  </li>
              : ''}
          </>
        )
      }) 
       : ( data.tasks && !data.tasks.error ) && data.tasks.map((task) => {
          return (
            <>
              {task && typeof task !== 'string' ?
                    <li className="active-task">
                      <h1 className="active-task-day">{(task.task_day >= 1 && task.task_day <= 9 )?'0':''}{task.task_day}/{(task.task_month >= 1 && task.task_month <= 9 )?'0':''}{task.task_month}</h1>
                      <div className="task-divisor-bar"></div>
                      <div className="active-task-about">
                        <h1>{task.task_name}</h1>
                        <h2>{task.task_text}</h2>
                      </div>
                    </li>
                : ''}
            </>
          )
        })
      }
      {
        (data.selectedTasks && data.selectedTasks.error) ? (
        <li className="active-task">
          <h1 className="active-task-day">{data.selectedTasks.task_day < 10 ? '0' : ''}{data.selectedTasks.task_day}/{data.selectedTasks.task_month < 10 ? '0' : ''}{data.selectedTasks.task_month}</h1>
          <div style={{background: 'red'}} className="task-divisor-bar"></div>
          <div className="active-task-about">
            <h1>Sem Tarefas</h1>
            <h2>{data.selectedTasks.error}</h2>
          </div>
        </li>
      ) : ''
      }
      </ul>
    </section>
  )
}
