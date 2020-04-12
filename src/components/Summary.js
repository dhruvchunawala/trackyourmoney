import React from 'react';

function Summary(props) {

  return (
    <div className="row ">
      <div className="col-sm-4">
        <div className={` card-header bg-warning  `}>
          {props.text}
        </div>
      </div>
      <div className="col-sm-4">
        {props.amount}
      </div>

    </div >
  );
}


export default Summary;
