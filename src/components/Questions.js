import React from 'react'

const Questions = ({list}) => {
    return (
        <ol>
            {list.map((item, index)=>{
                return(
                <li key={index} onClick={(key)=>console.log(key)}>
                    <p>{item.question}</p>
                    
                        <div className="answer">
                            <input type="checkbox" />
                            <p>{item.answers.answer_a}</p>
                        </div>
                        <div className="answer">
                            <input type="checkbox" />
                            <p>{item.answers.answer_b}</p>
                        </div>
                        <div className="answer">
                            <input type="checkbox" />
                            <p>{item.answers.answer_c}</p>
                        </div>
                        <div className="answer">
                            <input type="checkbox" />
                            <p>{item.answers.answer_d}</p>
                        </div>
                    
                </li>)
            })}
        </ol>
    )
}

export default Questions
