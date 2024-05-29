import { useContext } from "react"
import { TasksContext } from "../context/data/tasks/TasksContext"

export default function Task() {
  const { tasks, setTasks } = useContext(TasksContext)
  console.log(tasks)
  return (
    <section id="task-container">
              <div id="task-header">
                <h1>Tasks</h1>
                <h2 id="task-day"></h2>
              </div>
      {
        tasks && tasks.map((task) => {
          return (
            <>
            {task? 
              <div id="task-body">
                <ul className="task-receiver">
                  <li className="active-task">
                      <h1 className="active-task-type">{task.task_name}</h1>
                    <div className="task-divisor-bar"></div>
                    <div className="active-task-about">
                      <h2 className="active-task-name">{task.task_text}</h2>
                    </div>
                  </li>
                </ul>
              </div>
            :''}
            </>
          )
        })
      }
    </section>
  )
}
