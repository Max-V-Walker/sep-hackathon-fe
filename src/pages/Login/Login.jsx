// npm modules
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

// services
import * as authService from '../../services/authService'

// css
import styles from './Login.module.css'

const LoginPage = ({ handleAuthEvt }) => {
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)

  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = evt => {
    setMessage('')
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = async evt => {
    evt.preventDefault()
    try {
      if (!import.meta.env.VITE_BACK_END_SERVER_URL) {
        throw new Error('No VITE_BACK_END_SERVER_URL in front-end .env')
      }
      await authService.login(formData)
      handleAuthEvt()
      navigate('/')
    } catch (err) {
      console.log(err)
      setMessage(err.message)
    }
  }

  const showPasswordClickHandler = () => {
    setShowPassword(preVal => !preVal)
  }

  const { email, password } = formData

  const isFormInvalid = () => {
    return !(email && password)
  }

  return (
    <main className={styles.container}>
      <h1>Log In</h1>
      <p className={styles.message}>{message}</p>
      <form autoComplete="off" onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          Email
          <input
            type="text"
            value={email}
            name="email"
            onChange={handleChange}
          />
        </label>
        <label className={styles.label}>
          Password
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            name="password"
            onChange={handleChange}
          />
          {showPassword ? <AiOutlineEyeInvisible onClick={showPasswordClickHandler} style={{width: "20px", height: "20px"}}/> : <AiOutlineEye onClick={showPasswordClickHandler} style={{width: "20px", height: "20px"}}/>}
        </label>
        <div>
          <Link to="/">Cancel</Link>
          <button className={styles.button} disabled={isFormInvalid()}>
            Log In
          </button>
        </div>
      </form>
    </main>
  )
}

export default LoginPage
