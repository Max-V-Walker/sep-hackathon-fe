// npm modules
import { useState } from 'react'

// components


// services
import * as recipeService from '../../services/recipeService'


// styles
import styles from './NewRecipeForm.module.css'


export default function NewRecipeForm({ increaseFormNumber, recipes,setRecipes, setRecipe }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    recipeCategory: '',
    recipeCuisine: '',
    recipeYield: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(formData)
    const newRecipe = await recipeService.createRecipe(formData)
    await setRecipe(newRecipe)
    await setRecipes([...recipes, newRecipe])
    increaseFormNumber()
  }

  return (
    <form
      className={styles.container}
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <div className={styles.inputContainer}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="description">Description</label>
        <textarea
          type="text"
          name="description"
          id="description"
          onChange={handleChange}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="recipeCategory">Category</label>
        <input
          type="text"
          name="recipeCategory"
          id="recipeCategory"
          onChange={handleChange}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="recipeCuisine">Cuisine</label>
        <input
          type="text"
          name="recipeCuisine"
          id="recipeCuisine"
          onChange={handleChange}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="recipeYield">Recipe Yeild</label>
        <input
          type="text"
          name="recipeYield"
          id="recipeYield"
          onChange={handleChange}
        />
      </div>
      <button type='submit'>
        Next
      </button>
    </form>
  )
}
