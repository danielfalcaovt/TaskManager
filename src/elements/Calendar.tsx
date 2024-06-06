import { useContext, useEffect, useState } from "react"
import { TasksContext } from "../context/data/tasks/TasksContext"
import axios from "axios"
import Cookies from 'js-cookie'

export default function Calendar() {
  const [calendarDays, setCalendarDays]: any = useState([])
  const [taskMonth, setTaskMonth] = useState()

  function handleDaysInCalendar() {
    const allDaysInArr: number[] = []
    const anoAtual = new Date().getFullYear()
    const mesAtual = new Date().getMonth()
    setTaskMonth(mesAtual)
    const primeiroDiaDoMes = new Date(anoAtual, mesAtual, 1).getDay()
    const ultimoDiaDoMes = new Date(anoAtual, mesAtual - 1, 0).getDate()
    const ultimosDiasDaSemana = new Date(anoAtual, mesAtual + 1, 1).getDay()
    let primeiroDiaDoProxMes = new Date(anoAtual, mesAtual + 1, 1).getDate()
    for (let firstDays = ultimoDiaDoMes - primeiroDiaDoMes; firstDays < ultimoDiaDoMes; firstDays++) {
      allDaysInArr.push(firstDays)
    }
    for (let day = 1; day <= ultimoDiaDoMes; day++) {
      allDaysInArr.push(day)
    }
    for (let lastDays = ultimosDiasDaSemana; lastDays < 7; lastDays++) {
      allDaysInArr.push(primeiroDiaDoProxMes)
      primeiroDiaDoProxMes++
    }
    setCalendarDays(allDaysInArr)
  }

  const { tasks, setTasks } = useContext(TasksContext)
  const [selectedDay, setSelectedDay] = useState()
  async function handleGetDayTasks(day: any) {
    try {
      setSelectedDay(day)
      const user = Cookies.get('user')
      const jwt = Cookies.get('token')
      const config = {
        headers: {
          'Authorization': `Bearer ${jwt}`
        }
      }
      taskMonth ? handleDaysInCalendar() : ''
      const todayDate = {
        id: user,
        taskDay: day,
        taskMonth: taskMonth
      }
      const response = await axios.post('http://192.168.1.67:3000/tasks/filter', todayDate, config)
      console.log(response)
      const dayTasks: object[] = []
      for (let pos = 0; pos <= 3; pos++) {
        dayTasks.push(response.data[pos])
      }
      setTasks(dayTasks)
      console.log(dayTasks)
    } catch (error) {
      setTasks(error)
    }
  }

  function checkIfHaveDayInCalendar() {
    const checkDay = Cookies.get('day')
    if (checkDay) {
      handleGetDayTasks(checkDay)
    }
  }

  async function fetchCalendarTask(evt) {
    evt.preventDefault()
    const taskName = evt.target.taskName.value
    const taskText = evt.target.taskText.value

    if (taskName.length <= 20 && taskText.length <= 60) {
      const user = Cookies.get('user')
      const jwt = Cookies.get('token')
      const config = {
        headers: {
          'Authorization': `Bearer ${jwt}`
        }
      }
      const httpRequest = {
        user_id: user,
        taskName,
        taskText,
        taskDay: selectedDay,
        taskMonth: new Date().getMonth()
      }
      await axios.post('http://localhost:3000/tasks', httpRequest, config)
      Cookies.set('day', selectedDay)
      window.location.reload()
    }
  }

  useEffect(() => {
    handleDaysInCalendar()
  }, [])

  return (
    <>
      <div id="calendar">
        <h1>Calendário</h1>
        <table>
          <tr>
            <th>Dom</th>
            <th>Seg</th>
            <th>Ter</th>
            <th>Qua</th>
            <th>Qui</th>
            <th>Sex</th>
            <th>Sáb</th>
          </tr>
          <tr>
            {calendarDays.slice(0, 7).map((day) => {
              return (
                day >= 20
                  ? <td><span>{day}</span></td>
                  : <td className={`day${day}`} onClick={() => { handleGetDayTasks(day) }}>{day}</td>

              )
            })}
          </tr>
          <tr>
            {calendarDays.slice(7, 14).map((day) => {
              return (
                <td className={`day${day}`} onClick={() => { handleGetDayTasks(day) }}>
                  {day}
                </td>
              )
            })}
          </tr>
          <tr>
            {calendarDays.slice(14, 21).map((day) => {
              return (
                <td className={`day${day}`} onClick={() => { handleGetDayTasks(day) }}>
                  {day}
                </td>
              )
            })}
          </tr>
          <tr>
            {calendarDays.slice(21, 28).map((day) => {
              return (
                <td className={`day${day}`} onClick={() => { handleGetDayTasks(day) }}>
                  {day}
                </td>
              )
            })}
          </tr>
          <tr>
            {calendarDays.slice(28, 35).map((day) => {
              return (
                day <= 7
                  ? <td onClick={() => { }}>
                    <span>
                      {day}
                    </span>
                  </td>
                  : <td className={`day${day}`} onClick={() => { handleGetDayTasks(day) }}>{day}</td>
              )
            })}
          </tr>
          {
            calendarDays[35] ? (
              <tr>
                {calendarDays.slice(35, 42).map((day) => {
                  return (
                    day <= 7
                      ? <td onClick={() => { }}>
                        <span>
                          {day}
                        </span>
                      </td>
                      : <td className={`day${day}`} onClick={() => { handleGetDayTasks(day) }}>{day}</td>
                  )
                })}
              </tr>
            ) : ''
          }
        </table>
        <div id="calendar-tasks">
          {
            selectedDay ? (
              <form onSubmit={fetchCalendarTask} method="POST">
                <input maxLength={20} name="taskName" type="text" placeholder="Título da Tarefa" />
                <input maxLength={60} name="taskText" type="text" placeholder="Descrição da Tarefa" />
                <button>Enviar</button>
              </form>
            ) : ''
          }
        </div>
      </div>
    </>
  )
}
