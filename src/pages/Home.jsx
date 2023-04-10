import { useEffect, useState } from 'react'
import axios from 'axios'
import style from './Home.module.css'
import { useGetUserID } from '../Hooks/useGetUserID'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

function Home() {
  const [recipes, setRecipes] = useState([])
  const [savedRecipes, setSavedRecipes] = useState([])
  const [cookie, _] = useCookies(["accessToken"])

  const userID = useGetUserID()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        await axios.get("http://localhost:3001/recipes").then(res => {
          setRecipes(res.data)

        })

      } catch (error) {
        console.log(error)
      }
    }

    const fetchSavedRecipe = async () => {
      try {
        await axios.get(`http://localhost:3001/recipes/saverRecipes/ids/${userID}`).then(res => {
          setSavedRecipes(res.data.savedRecipes)
        })

      } catch (error) {
        console.log(error)
      }
    }
    fetchRecipe()
    if (cookie.accessToken) fetchSavedRecipe()

  }, [])

  const saveRecipe = async (recipeID) => {
    try {
      await axios.put("http://localhost:3001/recipes", {
        userID,
        recipeID
      }, {
        headers: { Authorization: cookie.accessToken }
      }
      ).then(res => {
        setSavedRecipes(res.data.savedRecipes)
        console.log(res.data)
        navigate("/")
      })
    } catch (error) {
      console.log(error)
    }
  }

  const isRecipeSaved = (id) => savedRecipes.includes(id)

  return (
    <div>
      <div className={style.topMargin}></div>
      <div className={style.container} >
        {recipes.map((recipe, idx) => {
          return (
            <div key={idx} className={style.card_wrapper} >
              <div className={style.inner_card}>

                {/* <!--title--> */}
                <div className={style.title}>
                  <p>{recipe.name}</p>
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

                <div className={style.startBtnDiv}>
                  <button className={style.start_btn} onClick={() => saveRecipe(recipe._id)} disabled={isRecipeSaved(recipe._id)}>
                    {isRecipeSaved(recipe._id) ? "Saved Recipe" : "save Recipe"}
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Home
