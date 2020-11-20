import React from 'react'
import {Link} from 'react-router-dom'

const Prob=props=>{

  console.log(props.match.params)

  return(
    <div>
      series_id:{props.match.params.series_id}<br/>
      problem_serial:{props.match.params.serial}<br/>
      <Link color="inherit" to={'/series/'+props.match.params.series_id+'/'+(parseInt(props.match.params.serial)+1)}>
        <button>
          Next Problem
        </button>
      </Link>
    </div>
  )
}

export default Prob
