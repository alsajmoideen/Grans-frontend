import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useGetUserID } from "../Hooks/useGetUserID"
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import style from './CreateRecipe.module.css'

function CreateRecipe() {
  const userId = useGetUserID()

  const navigate = useNavigate()

  const [cookie, _] = useCookies(["accessToken"])
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    cookingTime: 0,
    userOwner: userId
  })



  const handleChange = (e) => {
    const { name, value } = e.target
    setRecipe({ ...recipe, [name]: value })
  }

  const addIngredients = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] })
  }

  const handleIngredientChange = (e, idx) => {
    const { value } = e.target
    const ingredients = recipe.ingredients
    ingredients[idx] = value
    setRecipe({ ...recipe, ingredients })

  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post("http://localhost:3001/recipes", recipe, {
        headers: { Authorization: cookie.accessToken }
      })
      alert("Recipe Created")
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='createRecipe'>
      <h2 className={style.hTag}>Create Recipe</h2>
      <div className={style.outerContainer}>
        <div className={style.formElement}>
          <form onSubmit={onSubmit}>
            <div className={style.divColumn}>
              <div>
                <label className={style.labelElement} htmlFor="name">Name:</label>
                <input className={style.inputElement} type="text" id='name' placeholder='Name' name='name' onChange={handleChange} />
              </div>

              <div>
                <label className={style.labelElement} htmlFor="ingredients">Ingredients</label>
                <button className={style.btnElement} onClick={addIngredients} type="button" >Add Ingredient</button>
                <div className={style.addItem}>
                {recipe.ingredients.map((ingredient, idx) => (
                  <input
                    className={style.inputElement}
                    key={idx}
                    type="text"
                    name='ingredients'
                    placeholder='New Ingredient'
                    value={ingredient}
                    onChange={(e) => handleIngredientChange(e, idx)}
                  />
                ))}
                </div>
              </div>

              <div>
                <label className={style.labelElement} htmlFor="instructions" >Instructions:</label>
                <textarea className={style.textAreaElement} cols="3" placeholder='Instructions' name="instructions" id='instructions' onChange={handleChange}></textarea>
              </div>

              <div>
                <label className={style.labelElement} htmlFor="cookingTime">Cooking Time:</label>
                <input className={style.inputElement} type="number" id='cookingTime' placeholder='Time' name='cookingTime' onChange={handleChange} />
              </div>

              <button className={style.btnElement} type="submit">Create Recipe</button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateRecipe
