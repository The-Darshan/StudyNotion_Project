import React from 'react'
import {Swiper,SwiperSlide} from 'swiper/react'
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { Pagination , Autoplay , Navigation } from 'swiper/modules';
import Course_Card from './Course_Card'

const CourseSlider = ({Courses}) => {
  return (
    <>
        {
             Courses?.length>0 ? (
                <Swiper
                    loop={true}
                    slidesPerView={1}
                    spaceBetween={30}
                    pagination={{
                        dynamicBullets : true,
                    }}
                    modules={[Autoplay,Pagination,Navigation]}
                    autoplay={{
                        delay:2500,
                        disableOnInteraction:false
                    }}
                    navigation={true}
                    breakpoints={{
                        1024 : {slidesPerView:3}
                    }}
                >
                    {
                        Courses?.map((course,index)=>(
                            <SwiperSlide key={index}>
                                <Course_Card course={course} Height={"h-[250px]"}/>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            )
            :
            (
                <p className="text-2xl text-center mt-10 mb-20">No courses founded</p>
            )
        }
    </>
  )
}

export default CourseSlider