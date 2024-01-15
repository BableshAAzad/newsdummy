import React, { Component } from 'react';
import Walk from "./../picFolder/Walk.gif"

export class Spinner extends Component {
  render() {
    return (
      <div className='text-center mt-5'>
        <img className='my-5' src={Walk} alt="Loading" width={100} height={100} />
      </div>
    )
  }
}

export default Spinner
