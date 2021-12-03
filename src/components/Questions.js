import React from 'react'
import {useState, useEffect} from "react"

const Questions = ({list}) => {

    let[ givenAnswer, setGivenAnswer ] = useState({
         questions: [],
         answers: []
    })


    const handleChecked = (e)=>{
        
        let newAnsArray =  [...givenAnswer.answers, `${e.target.name} : ${e.target.id}`]
        // let newQuestArray = [...givenAnswer.questions, ]

        if(givenAnswer.answers.includes(`${e.target.name} : ${e.target.id}`)){

            newAnsArray = newAnsArray.filter(ans => ans !== `${e.target.name} : ${e.target.id}`) 
        }

        setGivenAnswer({
            answers:newAnsArray
        })
        
    }



    useEffect(() => {
       console.log(givenAnswer);
    }, [givenAnswer])



    return (
        <ol>
            {list.map((item, index)=>{
                return(
                <li key={index}>
                    <p>{item.question}</p>
                    
                        <div className="answer">
                            <input id="ans_a" name={`${index+1}. ${item.question}`} type="checkbox" onChange={handleChecked}/>
                            <label htmlFor="ans_a">{item.answers.answer_a}</label>
                        </div>
                        <div className="answer">
                            <input id="ans_b" name={`${index+1}. ${item.question}`} type="checkbox" onChange={handleChecked}/>
                            <label htmlFor="ans_b">{item.answers.answer_b}</label>
                        </div>
                        <div className="answer">
                            <input id="ans_c" name={`${index+1}. ${item.question}`} type="checkbox" onChange={handleChecked}/>
                            <label htmlFor="ans_c">{item.answers.answer_c}</label>
                        </div>
                        <div className="answer">
                            <input id="ans_d" name={`${index+1}. ${item.question}`} type="checkbox" onChange={handleChecked}/>
                            <label htmlFor="ans_d">{item.answers.answer_d}</label>
                        </div>
                        
                    
                </li>)
            })}
        </ol>
    )
}

export default Questions
