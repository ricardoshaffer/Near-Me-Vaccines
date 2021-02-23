import React, { useState, useLayoutEffect, useRef } from 'react';
import { AnimateOnChange } from 'react-animation'
import './css.scss'



const Output = () => {
  const words = [

    '👩‍⚕️',
    '😷',
    '👵',
    '👩‍🚒',
    '🧑‍🌾',
    '👨‍🏫'
  ]

  const [current, setCurrent] = useState(0)
  const [currentWidth, setCurrentWidth] =  useState(0)
  const [currentTextStyle, setCurrentTextStyle] = useState({})
  const currentTextRef = useRef()
  const nextTextRef = useRef()
  
  const nextItem = current => {
    if (current === words.length - 1) {
        return 0
      } else {
        return current + 1
      }
  }

  useLayoutEffect(() => {
    const interval = setInterval(() => {
      setCurrent(nextItem(current))
      nextTextRef.current.innerText = words[nextItem(current)]
      const nextTextSize = nextTextRef.current
      setCurrentWidth(nextTextSize)
      setCurrentTextStyle ({
          opacity: 0
      })
      setTimeout(() => {
        setCurrentTextStyle ({
          opacity: 1
      })
      }, 500)
    },1500);
    return (() => {
      clearInterval(interval)
    })
  })
  
  return (
  
    <div>
      <h1 className="home-banner">find your vaccination site: <AnimateOnChange className="foo" durationOut={500}><div className="container" style={{width: currentWidth ? currentWidth + 'px': 'auto'}}><div className="text-width-wrapper" style={currentTextStyle} ref={currentTextRef}>{words[current]}</div></div></AnimateOnChange>.</h1>
      <h1 className="hidden-text" ref={nextTextRef} />
    </div>
  )
}
export default Output;