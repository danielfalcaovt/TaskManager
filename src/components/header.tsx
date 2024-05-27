import NoticeButton from "../elements/buttons/NoticeButton";
import ProfileButton from "../elements/buttons/ProfileButton";
import '../styles/components/header.css'

export default function Header() {
  return (
    <header>
      <div id="header-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="white" fill="none">
          <path d="M7.01428 16.0029H11.0143M7.01428 11.0053H15.0143" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
          <path d="M10.0143 21.9999H11.0143" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
          <path d="M7.51083 21.9999C6.33921 21.9749 5.53921 21.9 4.76421 21.6751C3.71491 21.4002 2.94905 20.4757 2.72421 19.1763C2.43921 17.9519 2.53921 14.9284 2.51416 11.3302C2.51623 8.53874 2.3892 5.85787 2.8392 4.33362C3.1142 3.83386 3.3392 2.00976 7.06421 2.03475C7.68921 2.00976 14.3142 1.95978 15.3642 2.05973C18.8642 2.1347 19.2142 3.93381 19.4142 5.63298C19.541 6.88236 19.5142 8.88138 19.5142 11.0053M7.01421 2.00976C7.31421 3.63396 7.28921 4.68344 8.38921 4.93332C8.86421 5.00828 9.9495 5.00628 11.1142 5.00828C12.1538 5.01007 13.2142 5.01945 13.6892 4.90833C14.8642 4.63347 14.7392 3.18418 15.0392 2.00976" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
          <path d="M18.2786 14.3787C16.9045 15.778 14.2563 18.2768 14.2563 18.4517C14.0427 18.7483 13.8565 19.3512 13.7316 20.2008C13.5747 20.9884 13.3868 21.6751 13.6067 21.875C13.8266 22.0749 14.6545 21.9064 15.5304 21.7251C16.2299 21.6501 16.8795 21.4002 17.2043 21.1504C17.679 20.7304 20.9018 17.4772 21.2766 17.0524C21.5514 16.6776 21.5764 15.9779 21.3365 15.5531C21.2016 15.2533 20.3522 14.4536 20.0774 14.2288C19.5777 13.9289 18.8782 13.8789 18.2786 14.3787Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
        </svg>
      </div>
      <div id="header-buttons">
        <NoticeButton />
        <ProfileButton />
      </div>
    </header>
  )
}
