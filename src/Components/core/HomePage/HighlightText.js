import React from 'react'

const HighlightText = ({text}) => {
  return (
        <span className={`font-bold bg-gradient-to-b from-[#12D8FA] via-[#12D8FA] to-[#A6FFCB]  text-transparent bg-clip-text`}>
            {" " +text}
        </span>
  )
}

export default HighlightText