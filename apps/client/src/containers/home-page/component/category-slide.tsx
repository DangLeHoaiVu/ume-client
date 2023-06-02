import React, { useRef, useState } from 'react'

import Image from 'next/legacy/image'

interface ICategoryProps {
  skills: any[]
}

const CategorySlide = (props: ICategoryProps) => {
  const boxList = useRef<any>(null)
  const outerBox = useRef<any>(null)
  const intervalMousePress = useRef<NodeJS.Timeout | null>(null)
  const [pressCount, setPressCount] = useState<number>(0)
  const [translateXPosition, setTranslateXPosition] = useState<number>(0)
  const [pressed, setPressed] = useState<boolean>(false)
  const [startX, setStartX] = useState<number>(0)
  const [dataList, setDataList] = useState(props)
  const [hadAddTransition, setHadAddTransition] = useState<boolean>(false)

  const startCounter = () => {
    if (!intervalMousePress.current) {
      intervalMousePress.current = setInterval(() => {
        setPressCount((prevCounter) => prevCounter + 1)
      }, 10)
    }
  }

  const stopCounter = () => {
    if (intervalMousePress.current) {
      clearInterval(intervalMousePress.current)
      intervalMousePress.current = null
      setPressCount(0)
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setStartX(e.clientX - translateXPosition)
    setPressed(true)

    startCounter()
  }
  const timing = 500
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!pressed) return
    setHadAddTransition(false)
    const newtranslateXPosition = e.clientX - startX
    setNewtranslateXPosition(newtranslateXPosition)

    startCounter()
  }
  const handleMouseUp = (e: React.MouseEvent) => {
    setPressed(false)

    stopCounter()
  }
  const setNewtranslateXPosition = (newtranslateXPosition: number) => {
    const childrenWidth = boxList.current.children[0].offsetWidth
    const cardDisplay = outerBox.current.offsetWidth / childrenWidth
    const minPositionToLeft = -(childrenWidth * (props.skills.length - cardDisplay))
    setTranslateXPosition(newtranslateXPosition)
    if (newtranslateXPosition > 0) setTranslateXPosition(0)
    if (newtranslateXPosition < minPositionToLeft) setTranslateXPosition(minPositionToLeft)
  }
  const handleChangeSkill = (numberChange: number) => {
    const childrenWidth = boxList.current.children[0].offsetWidth
    let newtranslateXPosition = translateXPosition - numberChange * childrenWidth
    newtranslateXPosition = Math.ceil(newtranslateXPosition / childrenWidth) * childrenWidth
    setHadAddTransition(true)
    setTranslateXPosition(newtranslateXPosition)
    setNewtranslateXPosition(newtranslateXPosition)
  }

  const handleClickSkill = (e: React.MouseEvent) => {
    e.preventDefault()
    console.log(e)
  }

  return (
    <>
      <div className="w-full overflow-hidden" ref={outerBox}>
        <div
          className={`flex select-none duration-0 min-w-max ${hadAddTransition ? `duration-${500} ease-in-out` : ''}`}
          style={{ transform: `translateX(${translateXPosition}px)` }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseOut={handleMouseUp}
          ref={boxList}
        >
          {props?.skills.map((item, index) => {
            return (
              <div
                tabIndex={index}
                className={`p-3 duration-500 ease-in-out cursor-pointer hover:scale-105`}
                key={item.id}
              >
                <a href={`${pressCount != 0 ? '#1' : '#'}`} draggable="false">
                  <div className="relative w-[170px] h-[250px]">
                    <Image
                      key={item.id}
                      className="absolute rounded-lg pointer-events-none"
                      layout="fill"
                      src={item.imageUrl}
                      alt={item.name}
                    />
                  </div>
                </a>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default CategorySlide
