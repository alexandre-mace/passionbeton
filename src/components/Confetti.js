import React from 'react'
import { useWindowSize } from 'react-use'
import ConfettiLib from 'react-confetti'

const Confetti = ({stop}) => {
    const { width, height } = useWindowSize()
    return (
        <ConfettiLib
            onConfettiComplete={() => stop()}
            width={width}
            recycle={false}
            numberOfPieces={500}
            height={height}
        />
    )
}
export default Confetti