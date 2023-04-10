import style from './Navbar.module.css'
import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

function Navbar() {
  const [cookie, setCookies] = useCookies()

  const navigate = useNavigate()

  const logout = async => {
    setCookies("accessToken", "")
    window.localStorage.removeItem("userID")
    navigate("/auth")
  }

  return (
    <div className={style.outer_navbar_div}>
      <div className={style.navbar}>
        <div className={style.logo}><h2>Grans Recipies</h2></div>
        <div className={style.hero_content}>
          <NavLink className={style.link} to='/'>Home </NavLink>
          <NavLink className={style.link} to='/createRecipe'>Create</NavLink>

          {!cookie.accessToken ? (<NavLink className={style.btnLink} to='/auth'><span> Login/Register</span></NavLink>) : (
            <>
              <NavLink className={style.link} to='/savedRecipes'>Saved</NavLink>
              <div className={style.btnLink} onClick={logout}><span>Logout</span></div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar

