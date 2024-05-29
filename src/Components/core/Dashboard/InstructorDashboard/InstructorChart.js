import React, { useState } from 'react';
import { Chart , registerables } from 'chart.js';
import { Pie } from 'react-chartjs-2';

Chart.register(...registerables);

const InstructorChart = ({courses}) => {

    const [currentChart , setCurrentChart] = useState("students");

    // function to generate random colors.
    const getRandomColors = (numColors)=>{
        const colors = [];

        for(let i=0;i<numColors;i++){
            const color = `rgb(${Math.floor(Math.random()*256)}, ${Math.floor(Math.random() * 256)} , ${Math.floor(Math.random()*256)})`;
            colors.push(color); 
        }
        return colors;
    }

    // Create Data for chart displaying student info

    const chartDataForStudents = {
        labels:courses.map((course)=>course.title),
        datasets : [
            {
                data:courses.map((course)=> course.totalStudentsEnrolled),
                backgroundColor : getRandomColors(courses?.length),
            }
        ]
    }

    // Create Data for chart displaying income info

    const chartDataForIncome = {
        labels:courses.map((course)=>course.title),
        datasets : [
            {
                data:courses.map((course)=> course.totalAmountGenerated),
                backgroundColor : getRandomColors(courses?.length),
            }
        ]
    }

    // Cretae options

    const options = {
    };

    return (
    <div className='rounded-lg bg-richblack-800 w-9/12 pl-10 pt-5 mt-4'>

       <p className='text-3xl font-semibold text-pure-greys-5'>Visualize</p> 
        <div className='text-yellow-400 mt-3 flex gap-x-5 transition-all duration-200'>
            <button onClick={()=>setCurrentChart("students")} className={`${currentChart=="students"?"bg-richblack-700 text-yellow-50 py-1 px-3 font-semibold":""}`}>
                Students
            </button>
            <button onClick={()=> setCurrentChart("income")} className={`${currentChart=="income"?"bg-richblack-700 text-yellow-50 py-1 px-3 font-semibold":""}`}>
                Income
            </button>
        </div>

        <div className='w-full h-80 flex justify-center items-center mt-2 pb-4'>
        <Pie
            data={currentChart ==="students"?chartDataForStudents : chartDataForStudents}
            options={options}
        />
        </div>

    </div>
  )
}

export default InstructorChart