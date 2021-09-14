import React from 'react';

export function NumberOfQuestions(props){
    return ( 
        <span  className="badge customized-badge rounded-border even-larger-badge " >Number of questions: {props.questions} </span>
    )
      
      
}