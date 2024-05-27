import { useContext, useEffect, useState } from "react"
import { TasksContext } from "../context/data/tasks/TasksContext"
import axios from "axios"
import Cookies from 'js-cookie'

export default function Calendar() {
  const [calendarDays, setCalendarDays]: any = useState([])
  function handleDaysInCalendar() {
    const allDaysInArr: number[] = []
    const anoAtual = new Date().getFullYear()
    const mesAtual = new Date().getMonth()
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
    for (let lastDays = ultimosDiasDaSemana; lastDays < 7; lastDays ++) {
      allDaysInArr.push(primeiroDiaDoProxMes)
      primeiroDiaDoProxMes++
    }
    setCalendarDays(allDaysInArr)
  }
  const {tasks, setTasks} = useContext(TasksContext)
  async function handleGetDayTasks(day: any) {
    try {
      
      const jwt = Cookies.get('token')
      const config = {
        headers: {
          'Authorization': `Bearer ${jwt}`
        }
      }
    const response = await axios.get('http://192.168.1.67:3000/tasks',  config)
    console.log(response)
    const dayTasks = {
      day: day
    }
    setTasks(dayTasks)
  } catch (error) {
   console.log(error) 
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
                  : <td className={`day${day}`} onClick={() => {handleGetDayTasks(day)}}>{day}</td>

              )
            })}
          </tr>
          <tr>
            {calendarDays.slice(7, 14).map((day) => {
              return (
                <td className={`day${day}`} onClick={() => {handleGetDayTasks(day)}}>
                  {day}
                </td>
              )
            })}
          </tr>
          <tr>
            {calendarDays.slice(14, 21).map((day) => {
              return (
                <td className={`day${day}`} onClick={() => {handleGetDayTasks(day)}}>
                  {day}
                </td>
              )
            })}
          </tr>
          <tr>
            {calendarDays.slice(21, 28).map((day) => {
              return (
                <td className={`day${day}`} onClick={() => {handleGetDayTasks(day)}}>
                  {day}
                </td>
              )
            })}
          </tr>
          <tr>
            {calendarDays.slice(28, 38).map((day) => {
              return (
                day <= 7 
                ?<td onClick={() => {}}>
                  <span>
                    {day}
                  </span>
                </td>
                : <td className={`day${day}`} onClick={() => {handleGetDayTasks(day)}}>{day}</td>
              )
            })}
          </tr>
        </table>
        <div id="calendar-tasks">
          <div className="c-task"></div>
          <div className="c-task"></div>
        </div>
      </div>
    </>
  )
}
