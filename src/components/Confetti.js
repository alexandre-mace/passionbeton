import React from 'react'
import { useWindowSize } from 'react-use'
import ConfettiLib from 'react-confetti'

const Confetti = () => {
    const { width, height } = useWindowSize()
    return (
        <ConfettiLib
            width={width}
            height={height}
        />
    )
}
export default Confetti