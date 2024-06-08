import { useContext, useEffect } from "react"
import { TasksContext } from "../context/data/tasks/TasksContext"
import { DataContext } from "../context/data/data-context"

export default function Task() {
  const { data, setData } = useContext(DataContext)
  return (
    <section id="task-container">
      <div id="task-header">
        <h1>Tasks</h1>
        <h2 id="task-day"></h2>
      </div>
      <ul className="task-receiver">
      {
       ( data.tasks && !data.tasks.error ) && data.tasks.map((task) => {
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
        (data.tasks && data.tasks.error) ? (
        <li className="active-task">
          <h1 className="active-task-day">{data.tasks.task_day}/{data.tasks.task_month}</h1>
          <div style={{background: 'red'}} className="task-divisor-bar"></div>
          <div className="active-task-about">
            <h1>Error</h1>
            <h2>{data.tasks.error}</h2>
          </div>
        </li>
      ) : ''
      }
      </ul>
    </section>
  )
}
