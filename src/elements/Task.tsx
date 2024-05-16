export default function Task() {
  return (
    <section id="task-container">
      <div id="task-header">
        <h1>Tasks</h1>
      </div>
      <div id="task-body">
        <ul className="task-receiver">
          <li className="active-task">
            <p className="active-task-hour">
              12:00
            </p>
            <div className="task-divisor-bar"></div>
            <div className="active-task-about">
              <h1 className="active-task-type">Studying</h1>
              <h2 className="active-task-name">Finish The TaskManager</h2>
            </div>
          </li>
        </ul>
      </div>
    </section>
  )
}
