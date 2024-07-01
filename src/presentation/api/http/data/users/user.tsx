import Cookies from 'js-cookie'

interface user {
    logout:()=> void
}

export default class UserMethods implements user {
    logout(): void {
        if (Cookies.get('token')) {
            Cookies.remove('token')
            window.location.reload()
        }
    }
}