import NoticeButton from "../elements/buttons/NoticeButton";
import ProfileButton from "../elements/buttons/ProfileButton";
import '../styles/components/header.css'

export default function Header() {
  return (
    <header>
      <div id="header-icon">
        <img src="./headericon.png" alt="task manager icon"/>
        <h1>TaskPilot</h1>
      </div>
      <div id="header-buttons">
        <NoticeButton />
        <ProfileButton />
      </div>
    </header>
  )
}
