import { useEffect, useState } from 'react'
import '../styles/components/home.css'
import Calendar from '../elements/Calendar';
import Task from '../elements/Task';

export default function Home() {
  const [today, setToday] = useState('')

  function handleNewDay() {
    const todayDate = new Date()
    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
    const dateText = `${todayDate.getDate()}, ${monthNames[todayDate.getMonth()]} de ${todayDate.getFullYear()}`
    setToday(dateText)
  }

  useEffect(() => {
    handleNewDay()
  }, [])

  return (
    <section id="home-container">
      <div id="functions-title">
        <h1>Hoje</h1>
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
  )
}
