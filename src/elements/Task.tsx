import { useContext, useEffect } from "react"
import { TasksContext } from "../context/data/tasks/TasksContext"

export default function Task() {
  const { tasks, setTasks } = useContext(TasksContext)

  return (
    <section id="task-container">
      <div id="task-header">
        <h1>Tasks</h1>
        <h2 id="task-day"></h2>
      </div>
      <ul className="task-receiver">
      {
        tasks && tasks.map((task) => {
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
      </ul>
    </section>
  )
}
