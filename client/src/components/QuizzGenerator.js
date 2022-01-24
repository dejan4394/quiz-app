import { Grid } from '@mui/material'
import React, { useState } from 'react'
import SelectComponent from "./SelectComponent.js"
import { GenerateQuizzButton } from './GenerateQuizzButton.js'

import { useSelector } from 'react-redux'


const QuizzGenerator = ({quizzData, token}) => {

    //Get Categories
    const filterredCategory = ()=>{
        const categories = quizzData.map( item=>item.category)
        let uniqueCategories = categories.filter((c, index) => {
            return categories.indexOf(c) === index;
        });
        
        return uniqueCategories
    }
    //----------------------
    
    
    //Get Difficulties
    const filterredDifficulty = ()=>{
        const difficulties = quizzData.map( item=>item.difficulty)
        let uniqueDifficulties = difficulties.filter((c, index) => {
            return difficulties.indexOf(c) === index;
        });
        
        return uniqueDifficulties
    }
    //------------------------
    
    
    //HANDLE SELECTIONS--------------
    const [category, setCategory] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [ammount, setAmmount] = useState('1');

    
    const handleCategory = (event) => {
        event.preventDefault()
      setCategory(event.target.value);
      console.log(event.target.value);
    };

    const handleDifficulty = (event) => {
        event.preventDefault()
      setDifficulty(event.target.value);
      console.log(event.target.value);
    };

    const handleAmmount = (event) => {
        event.preventDefault()
      setAmmount(event.target.value);
      console.log(event.target.value);
    };

    

    return (
        <Grid container display="flex" flexDirection="column">
           
            <Grid>
                <Grid item marginTop="20px">
                    <SelectComponent label="category" queryArray={filterredCategory()} value={category} onChange={handleCategory}/>
                </Grid> 
                <Grid item marginTop="20px">
                    <SelectComponent label="difficulty" queryArray={filterredDifficulty()} value={difficulty} onChange={handleDifficulty}/>
                </Grid> 
                <Grid item marginTop="20px">
                    <SelectComponent label="Ammount of questions" queryArray={[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,17,18,19,20]} value={ammount} onChange={handleAmmount}/>
                </Grid> 
            </Grid>
            
            {quizzData && <GenerateQuizzButton category={category} difficulty={difficulty} ammount={ammount} token={token}/>}
        </Grid>
        
    )
}

export default QuizzGenerator
