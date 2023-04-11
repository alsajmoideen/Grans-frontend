import { useEffect, useState } from 'react'
import axios from 'axios'
import { useGetUserID } from '../Hooks/useGetUserID'
import style from './Home.module.css'


function SavedRecipes() {
  
  const [savedRecipes, setSavedRecipes] = useState([])

  const userID = useGetUserID()
 

  useEffect(() => {

    const fetchSavedRecipe = async () => {
      try {
        await axios.get(`https://grans-recipe-mern-api.onrender.com/recipes/saverRecipes/${userID}`).then(res => {
          setSavedRecipes(res.data.savedRecipes)
          console.log(res.data)
        })

      } catch (error) {
        console.log(error)
      }
    }
    fetchSavedRecipe()
  }, [])

  // console.log(savedRecipes)
  return (
    <div>
      <div className={style.topMargin}></div>
      <div className={style.container} >
        {savedRecipes.map((recipe, idx) => {
          return (
            <div key={idx} className={style.card_wrapper} >
              <div className={style.inner_card}>

                {/* <!--title--> */}
                <div className={style.title}>
                  <header>{recipe.name}</header>
                </div>

                {/* <!--details--> */}
                <div className={style.details}>

                  <div className={style.Details}>
                    <h3>Ingredience</h3>
                    <p>{recipe.ingredients.length}</p>
                  </div>

                  <div className={style.Details}>
                    <h3>Time</h3>
                    <p>{recipe.cookingTime} minutes</p>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SavedRecipes
