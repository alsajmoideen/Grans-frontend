import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import style from './Auth.module.css'

function Auth() {
  return (
    <div className={style.divAlign}>
      <div className={style.firstHalfDiv}>
        <Register />
      </div>
      <div className={style.secondHalfDiv}>
        <Login />
      </div>
    </div>
  )
}

// ---------------- Login Component ---------------------

function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [_, setCookies] = useCookies(["accessToken"])

  const navigate = useNavigate()

  async function onSubmit(e) {
    e.preventDefault()

    try {
      await axios.post("https://grans-recipe-mern-api.onrender.com/auth/login", {
        username,
        password
      }).then(res => {
        if (!res.data.validPassword) {
          alert("Password is wrong")
          navigate("/auth")
        } else {
          setCookies("accessToken", res.data.token)
          window.localStorage.setItem("userID", res.data.userID)
          navigate("/")
        }

      })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Form
      formName={'Login'}
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      onSubmit={onSubmit}
    />
  )
}

// ------------------- Register Component -------------------

function Register() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      await axios.post("https://grans-recipe-mern-api.onrender.com/auth/register", {
        username,
        password
      }).then((res) => alert(res.data.message))

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Form
      formName={'Register'}
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      onSubmit={onSubmit}
    />
  )
}

// ------------------- Form Component ------------------

function Form({ formName, username, setUsername, password, setPassword, onSubmit }) {

  return (
    <div className={style.container}>
      <div className={style.brand_logo}>G</div>
      <div className={style.brand_title}>{formName}</div>
      <div className={style.inputs}>
        <form onSubmit={onSubmit}>
          <div>
            <label className={style.labelElement} htmlFor="username">Username:</label>
            <input
              className={style.inputElement}
              type="text"
              id="username"
              placeholder='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            <label className={style.labelElement} htmlFor="password">Password:</label>
            <input
              className={style.inputElement}
              type="password"
              id="password"
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button className={style.btnElement} type="submit">{formName} </button>
        </form>
      </div>
    </div>

  )
}

export default Auth
