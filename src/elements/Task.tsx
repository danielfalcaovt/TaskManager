import { useContext } from "react"
import { DataContext } from "../context/data/data-context"
import deleteTasks from "../http/data/tasks/delete-task"
import Cookies from 'js-cookie'
import { ITask } from "../http/data/tasks/services/task-interfaces"

export default function Task() {
  const { data, setData } = useContext(DataContext)
  const token: string | undefined = Cookies.get('token')
  console.log(data)
  async function removeTask(taskId: string) {
    try {
      const { id } = data.user
      await deleteTasks(token, id, taskId)
      setData((oldValue: any) => {
        const newValue = oldValue
  
        const taskRemoved = newValue.tasks.filter((task : ITask) => {
          return task.task_id !== taskId
        })
        const selectedTaskRemoved = newValue.selectedTasks.filter((task : ITask) => {
          return task ? task.task_id !== taskId : ''
        })
        newValue.tasks = taskRemoved
        selectedTaskRemoved.length > 0 ? newValue.selectedTasks = selectedTaskRemoved : delete newValue.selectedTasks
        return {
          ...newValue
        }
      })
      Cookies.remove('selectedDay')
    } catch (error) {
      console.log(error)
      return false
    }
  }
  
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
                        <path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                        <path d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                        <path d="M9.5 16.5L9.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                        <path d="M14.5 16.5L14.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
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

      {((!data.tasks || data.tasks.length === 0) && (!data.selectedTasks || data.selectedTasks.length === 0)) 
      ? (
        <li className="active-task">
          <h1 className="active-task-day"></h1>
          <div style={{background: 'red'}} className="task-divisor-bar"></div>
          <div className="active-task-about">
            <h1>Sem Tarefas</h1>
            <h2>Adicione a sua primeira tarefa!</h2>
          </div>
        </li>        
      )
      :''}
      </ul>
    </section>
  )
}
