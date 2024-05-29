import React from 'react'
import { FaArrowRight } from "react-icons/fa";
import CTAbutton from './Button';
import { TypeAnimation } from 'react-type-animation';

const CodeBlocks = ({
    position , heading,subheading,ctabtn1,ctabtn2,codeblock,backgrnGradient , codeColor
}) => {
  return (
    <div className={`flex ${position} my-20 jsutify-between gap-64`}>
        
        {/* Section 1 */}

        <div className='flex flex-col w-[40%] gap-5 font-inter'>

            {heading}
            <div className='text-richblack-300 font-bold'>
                {subheading}
            </div>

            <div className='flex gap-7 mt-14'>
                <CTAbutton active={ctabtn1.active} linkedto={ctabtn1.link} >
                    <div className='flex items-center gap-2'>
                    {ctabtn1.text}
                    <FaArrowRight/>
                    </div>
                </CTAbutton>

                <CTAbutton active={ctabtn2.active} linkedto={ctabtn2.link}>
                    {ctabtn2.text}
                </CTAbutton>

            </div>

        </div>

        {/* Section 2 */}

        <div className={`h-fit flex text-10[px] w-[50%] py-4 lg:w-[500px] ${backgrnGradient}`}>
            <div className='text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold'>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
            </div>

            <div className={`w-[90%] flex flex-col font-bold font-mono gap-2 ${codeColor} pr-2`}>

                <TypeAnimation
                    sequence={[codeblock,2000,""]}
                    repeat={Infinity}
                    cursor={true}
                    omitDeletionAnimation={true}
                    style={{whiteSpace:"pre-line",display:'block'}}
                />

            </div>

        </div>

    </div>
  )
}

export default CodeBlocks