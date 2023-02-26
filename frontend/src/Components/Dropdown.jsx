import React from 'react'

const Dropdown = (props) => {
  return (
    <div className='dropdown' >
        <h1>{props.name}</h1>
        <select name={props.name} onChange={e => props.cb(e)} value={props.value} disabled={props.disabled}>s
            {props.items.map((option,idx) => (
                <option key={idx} value={option.name}>{option.name}</option>
            ))}
        </select>
    </div>
  )
}

export default Dropdown