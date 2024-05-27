import { useContext } from "react"
import { TasksContext } from "../context/data/tasks/TasksContext"

export default function Task() {
  const {tasks, setTasks} = useContext(TasksContext)

  return (
    <section id="task-container">
      <div id="task-header">
        <h1>Tasks</h1>
        <h2 id="task-day">{tasks? tasks.day : ''}</h2>
      </div>
      <div id="task-body">
        <ul className="task-receiver">
          <li className="active-task">
            <p className="active-task-hour"></p>
            <div className="task-divisor-bar"></div>
            <div className="active-task-about">
              <h1 className="active-task-type">{}</h1>
              <h2 className="active-task-name"></h2>
            </div>
          </li>
        </ul>
      </div>
    </section>
  )
}
