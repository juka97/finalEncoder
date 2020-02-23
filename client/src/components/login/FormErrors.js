import React from 'react';

export const FormErrors = ({formErrors}) =>
  <div className='formErrors'>
    {Object.keys(formErrors).map((fieldName, i) => {
      if(formErrors[fieldName].length > 0){
        return (
          <div key={i} align="center" >{formErrors[fieldName]}</div>
        )        
      } else {
        return '';
      }
    })}
  </div>