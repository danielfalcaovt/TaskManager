export default class calendarEvents {
  generateDays() {
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
  }
}