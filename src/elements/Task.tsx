import { useContext } from "react"
import { DataContext } from "../context/data/data-context"
import deleteTasks from "../http/data/tasks/delete-task"
import Cookies from 'js-cookie'
import getTasks from "../http/data/tasks/get-task"

export default function Task() {
  const { data, setData } = useContext(DataContext)
  const token: string | undefined = Cookies.get('token')

  async function removeTask(taskId: string) {
    const { id } = data.user
    await deleteTasks(token, id, taskId)
    const allTasks = await getTasks(token)
    setData((oldValue: any) => {
      delete oldValue.selectedTasks
      return {
        ...oldValue,
        tasks: allTasks.data
      }
    })
  }

  console.log(data.tasks)

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
                    <div onClick={() => {
                      removeTask(task.task_id)
                    }} className="delete-task">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                        <path d="M19.0005 4.99988L5.00045 18.9999M5.00045 4.99988L19.0005 18.9999" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
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

      {(!data.tasks && !data.selectedTasks) ? (
        <li className="active-task">
          <h1 className="active-task-day"></h1>
          <div style={{background: 'red'}} className="task-divisor-bar"></div>
          <div className="active-task-about">
            <h1>Sem Tarefas</h1>
            <h2>Adicione a sua primeira tarefa!</h2>
          </div>
        </li>        
      ):''}
      </ul>
    </section>
  )
}
