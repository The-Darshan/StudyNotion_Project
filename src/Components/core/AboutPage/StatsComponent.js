import React from 'react'

const Stats = [
    {count:"5K" , label:"Active Students"},
    {count:"10+" , label:"Mentors"},
    {count:"200+" , label:"Courses"},
    {count:"50+" , label:"Awards"},
]

const StatsComponent = () => {
  return (
    <section className='bg-richblack-700 mb-20'>
        <div className='p-10'>
            <div className='flex gap-x-60 ml-32 text-center'>
                {
                    Stats.map((data,indx)=>{
                        return (
                            <div key={indx} className='flex flex-col gap-2'>
                                <h1 className='text-4xl font-bold font-inter'>
                                    {data.count}
                                </h1>
                                <h2 className='text-richblack-500'>
                                    {data.label}
                                </h2>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </section>
  )
}

export default StatsComponent