import React from 'react'

const Footer = () => {
  let footstyle = {
    position: "relative",
    top: "10vh",
    width: "100%"
  }
  return (
    <footer className='bg-dark text-light py-3' style={footstyle}>
      <p className="text-center">
        copyright by kishor
      </p>
    </footer>
  )
}

export default Footer
