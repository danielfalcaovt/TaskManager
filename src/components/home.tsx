import { useEffect, useState } from 'react'
import '../styles/components/home.css'
import Calendar from '../elements/Calendar';
import { TasksContext } from '../context/data/tasks/TasksContext';
import Task from '../elements/Task';

export default function Home() {
  const [today, setToday] = useState('')
  const [tasks, setTasks] = useState()

  function handleNewDay() {
    const todayDate = new Date()
    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    const dateText = `${todayDate.getDay()}, ${monthNames[todayDate.getMonth()]} de ${todayDate.getFullYear()}`
    setToday(dateText)
  }

  useEffect(() => {
    handleNewDay()
  }, [])

  return (
    <TasksContext.Provider value={{tasks, setTasks}}>
      <section id="home-container">
        <div id="functions-title">
          <h1>Today</h1>
          <h2>{today}</h2>
        </div>
        <div id='function-calendar'>
          <Calendar />
        </div>
        <div id='function-schedule'>
          <Task/>
        </div>
        <div id='projects-container'>

        </div>
      </section>
    </TasksContext.Provider>
  )
}
