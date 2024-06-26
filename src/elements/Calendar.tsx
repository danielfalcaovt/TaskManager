import { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { DataContext } from "../context/data/data-context";
import postTask from "../http/data/tasks/post-task";
import getSpecificTask from "../http/data/tasks/get-specific-task";
import { calendarDaysInName } from "./calendar/calendar-days";
import { ITask } from "../http/data/tasks/services/task-interfaces";

export default function Calendar() {
  const [calendarDays, setCalendarDays]: any = useState([]);
  const [taskMonth, setTaskMonth] = useState();
  const [mesAtual, setMesAtual] = useState(new Date().getMonth())

  function handleDaysInCalendar() {
    const allDaysInArr: number[] = [];
    const anoAtual = new Date().getFullYear();
    setTaskMonth(mesAtual);
    const ultimoDiaDoMesPassado = new Date(anoAtual, mesAtual, 0).getDate();
    const ultimoDiaDoMes = new Date(anoAtual, mesAtual+1, 0).getDate()
    const primeiroDiaDaSemana = new Date(anoAtual, mesAtual, 1).getDay()
    const ultimosDiasDaSemana = new Date(anoAtual, mesAtual + 1, 1).getDay();
    let primeiroDiaDoProxMes = new Date(anoAtual, mesAtual + 1, 1).getDate();
    for (let primeirosDias = ultimoDiaDoMesPassado - primeiroDiaDaSemana + 1; primeirosDias <= ultimoDiaDoMesPassado; primeirosDias++) {
      allDaysInArr.push(primeirosDias)
    }
    for (let day = 1; day <= ultimoDiaDoMes; day++) {
      allDaysInArr.push(day);
    }
    for (let lastDays = ultimosDiasDaSemana; lastDays < 7; lastDays++) {
      allDaysInArr.push(primeiroDiaDoProxMes);
      primeiroDiaDoProxMes++;
    }
    setCalendarDays(allDaysInArr);
  }

  const { data, setData } = useContext(DataContext);
  const selectedDay = Cookies.get('selectedDay')
  const [selectedDayStyle, setSelectedDayStyle] = useState({
    background: "#7266F8",
    borderRadius: "25px",
  });
  async function handleGetDayTasks(day: any) {
    try {
      Cookies.set('selectedDay', day)
      const user = Cookies.get("user");
      const jwt = Cookies.get("token");
      taskMonth ? handleDaysInCalendar() : "";
      const todayDate = {
        userId: user,
        taskDay: day,
        taskMonth: Number(taskMonth)
      };
      console.log(taskMonth)
      const response = await getSpecificTask(todayDate, jwt)
      if (!response.data.error) {
        let dayTasks: object[] = [];
        for (let pos = 0; pos <= 3; pos++) {
          dayTasks.push(response.data[pos]);
        }
        
        setData((oldValue) => {
          delete oldValue.error;
          return {
            ...oldValue,
            selectedTasks: dayTasks,
          };
        });
      } else {
        setData((oldValue) => {
          return {
            ...oldValue,
            selectedTasks: response.data,
          };
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchCalendarTask(evt) {
    evt.preventDefault();
    const taskName = evt.target.taskName.value;
    const taskText = evt.target.taskText.value;
    evt.target.taskName.value = "";
    evt.target.taskText.value = "";
    if (taskName.length <= 20 && taskText.length <= 60) {
      const user = Cookies.get("user");
      const jwt = Cookies.get("token");
      const httpRequest = {
        user_id: user,
        taskName,
        taskText,
        taskDay: selectedDay,
        taskMonth: Number(mesAtual)
      };
      const getQuery = {
        userId: user,
        taskDay: selectedDay,
        taskMonth: Number(mesAtual)
      };
      const response = await postTask(httpRequest, jwt);
      const allTasks = await getSpecificTask(getQuery, jwt);
      if (response && response.data) {
        setData((oldValue: any) => {
          const newValue = oldValue;
          for (const task of allTasks.data) {
            newValue.tasks.push(task);
          }
          newValue.tasks = newValue.tasks.sort((a, b) => {
            if (a.task_month !== b.task_month) {
              return a.task_month - b.task_month; 
            } else {
              return a.task_day - b.task_day;
            }
          })
          newValue.selectedTasks = allTasks.data;
          return {
            ...newValue,
          };
        });
      } else {
        console.log(response);
      }
    }
  }

  function decreaseMonth() {
    if (mesAtual > 0 && mesAtual <= 11) {
      setMesAtual((oldValue) => {
        return oldValue -= 1
      })
      Cookies.remove('selectedDay')
    }
  }

  function increaseMonth() {
    if (mesAtual >= 0 && mesAtual < 11) {
      setMesAtual((oldValue) => {
        return oldValue += 1
      })
      Cookies.remove('selectedDay')
    }
  }

  useEffect(() => {
    handleDaysInCalendar();
  }, [mesAtual])

  return (
    <>
      <div id="calendar">
        <div id="calendar-head">
          <h1>Calendário</h1>
          <div id="calendar-month">
            <svg onClick={() => {
              decreaseMonth()
            }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" color="white" fill="none">
                <path d="M15 6C15 6 9.00001 10.4189 9 12C8.99999 13.5812 15 18 15 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <span draggable>{calendarDaysInName[mesAtual]}</span>
            <svg onClick={() => {
              increaseMonth()
            }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" color="white" fill="none">
                <path d="M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
        </div>
        <table>
          <thead draggable>
            <tr>
              <th>Dom</th>
              <th>Seg</th>
              <th>Ter</th>
              <th>Qua</th>
              <th>Qui</th>
              <th>Sex</th>
              <th>Sáb</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {calendarDays.slice(0, 7).map((day) => {
                return day >= 20 ? (
                  <td draggable key={`${day}bmonth`}>
                    <span>{day}</span>
                  </td>
                ) : (
                  <td
                    draggable
                    key={day}
                    className={`day${day}`}
                    style={
                      selectedDay == day
                        ? selectedDayStyle
                        : data.tasks &&
                          data.tasks.length > 0 &&
                          data.tasks.find((task) => task.task_day == day && task.task_day == day && task.task_month == mesAtual)
                        ? { borderRadius: "25px", background: "#6C6B78" }
                        : {}
                    }
                    onClick={() => {
                      if (selectedDay == day) {
                        Cookies.remove('selectedDay')
                        setData((oldValue: any) => {
                          delete oldValue.selectedTasks;

                          return {
                            ...oldValue,
                          };
                        });
                      } else {
                        handleGetDayTasks(day);
                      }
                    }}
                  >
                    {day}
                  </td>
                );
              })}
            </tr>
            <tr>
              {calendarDays.slice(7, 14).map((day) => {
                return (
                  <td
                    key={day}
                    draggable
                    className={`day${day}`}
                    style={
                      selectedDay == day
                        ? selectedDayStyle
                        : data.tasks &&
                          data.tasks.length > 0 &&
                          data.tasks.find((task) => task.task_day == day && task.task_day == day && task.task_month == mesAtual)
                        ? { borderRadius: "25px", background: "#6C6B78" }
                        : {}
                    }
                    onClick={() => {
                      if (selectedDay == day) {
                        Cookies.remove('selectedDay')
                        setData((oldValue: any) => {
                          delete oldValue.selectedTasks;

                          return {
                            ...oldValue,
                          };
                        });
                      } else {
                        handleGetDayTasks(day);
                      }
                    }}
                  >
                    {day}
                  </td>
                );
              })}
            </tr>
            <tr>
              {calendarDays.slice(14, 21).map((day) => {
                return (
                  <td
                    draggable
                    key={day}
                    className={`day${day}`}
                    style={
                      selectedDay == day
                        ? selectedDayStyle
                        : data.tasks &&
                          data.tasks.length > 0 &&
                          data.tasks.find((task) => task.task_day == day && task.task_day == day && task.task_month == mesAtual)
                        ? { borderRadius: "25px", background: "#6C6B78" }
                        : {}
                    }
                    onClick={() => {
                      if (selectedDay == day) {
                        Cookies.remove('selectedDay')
                        setData((oldValue: any) => {
                          delete oldValue.selectedTasks;

                          return {
                            ...oldValue,
                          };
                        });
                      } else {
                        handleGetDayTasks(day);
                      }
                    }}
                  >
                    {day}
                  </td>
                );
              })}
            </tr>
            <tr>
              {calendarDays.slice(21, 28).map((day) => {
                return (
                  <td
                    draggable
                    key={day}
                    className={`day${day}`}
                    style={
                      selectedDay == day
                        ? selectedDayStyle
                        : data.tasks &&
                          data.tasks.length > 0 &&
                          data.tasks.find((task) => task.task_day == day && task.task_day == day && task.task_month == mesAtual)
                        ? { borderRadius: "25px", background: "#6C6B78" }
                        : {}
                    }
                    onClick={() => {
                      if (selectedDay == day) {
                        Cookies.remove('selectedDay')
                        setData((oldValue: any) => {
                          delete oldValue.selectedTasks;

                          return {
                            ...oldValue,
                          };
                        });
                      } else {
                        handleGetDayTasks(day);
                      }
                    }}
                  >
                    {day}
                  </td>
                );
              })}
            </tr>
            <tr>
              {calendarDays.slice(28, 35).map((day) => {
                return day <= 7 ? (
                  <td draggable key={day} onClick={() => {}}>
                    <span>{day}</span>
                  </td>
                ) : (
                  <td
                    draggable
                    className={`day${day}`}
                    style={
                      selectedDay == day
                        ? selectedDayStyle
                        : data.tasks &&
                          data.tasks.length > 0 &&
                          data.tasks.find((task) => task.task_day == day && task.task_day == day && task.task_month == mesAtual)
                        ? { borderRadius: "25px", background: "#6C6B78" }
                        : {}
                    }
                    onClick={() => {
                      if (selectedDay == day) {
                        Cookies.remove('selectedDay')
                        setData((oldValue: any) => {
                          delete oldValue.selectedTasks;

                          return {
                            ...oldValue,
                          };
                        });
                      } else {
                        handleGetDayTasks(day);
                      }
                    }}
                  >
                    {day}
                  </td>
                );
              })}
            </tr>
            {calendarDays[35] ? (
              <tr>
                {calendarDays.slice(35, 42).map((day) => {
                  return day <= 7 ? (
                    <td draggable key={`${day}bmonth`} onClick={() => {}}>
                      <span>{day}</span>
                    </td>
                  ) : (
                    <td
                      draggable
                      key={day}
                      className={`day${day}`}
                      style={
                        selectedDay == day
                          ? selectedDayStyle
                          : data.tasks &&
                            data.tasks.length > 0 &&
                            data.tasks.find((task) => task.task_day == day && task.task_day == day && task.task_month == mesAtual)
                          ? { borderRadius: "25px", background: "#6C6B78" }
                          : {}
                      }
                      onClick={() => {
                        if (selectedDay == day) {
                          Cookies.remove('selectedDay')
                          setData((oldValue: any) => {
                            delete oldValue.selectedTasks;

                            return {
                              ...oldValue,
                            };
                          });
                        } else {
                          handleGetDayTasks(day);
                        }
                      }}
                    >
                      {day}
                    </td>
                  );
                })}
              </tr>
            ) : (
              ""
            )}
          </tbody>
        </table>
        <div id="calendar-tasks">
          {selectedDay ? (
            <form onSubmit={fetchCalendarTask} method="POST">
              <input
                maxLength={20}
                name="taskName"
                type="text"
                placeholder="Título da Tarefa"
              />
              <input
                maxLength={60}
                name="taskText"
                type="text"
                placeholder="Descrição da Tarefa"
              />
              <button>Enviar</button>
            </form>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
