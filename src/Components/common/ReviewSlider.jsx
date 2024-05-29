import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination, Autoplay, Navigation } from "swiper/modules";
// import Course_Card from "./Course_Card";
import ReactStars from "react-rating-stars-component";
import { useEffect } from "react";
import { apiConnector } from "../../Services/apiconnector";
import { FaStar } from "react-icons/fa";
import { courseAPI } from "../../Services/apis";

const ReviewSlider = () => {
  const [reviews, setReviews] = useState([]);
  const truncateWords = 15;

  useEffect(() => {
    const fetchAllReview = async () => {
      const response = await apiConnector("GET", courseAPI.GET_ALL_RATINGS_API);
      const { data } = response;
      console.log(data);
      if (data?.success) {
        setReviews(data?.data);
      }
    };
    fetchAllReview();
  }, []);

  return (
    <div className="text-white w-full mb-20 mt-6 ">
      <div className="h-[190px] ">
        <Swiper
          slidesPerView={4}
          spaceBetween={24}
          loop={true}
          freeMode={true}
          modules={[Autoplay, Pagination, FreeMode]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          className="w-full"
        >
          {reviews.map((review, indx) => (
            <SwiperSlide key={indx} className="bg-richblack-800">
                <div className="ml-5">

                <div className="flex mt-3 gap-x-3">
              <img
                src={
                  review?.username?.image
                    ? review?.username?.image
                    : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.username?.firstname} ${review?.username?.lastname}`
                }
                alt="Profile Pic"
                className="h-9 w-9 object-cover rounded-full"
              />
              <div>
              <p className="font-semibold text-sm">
                {review?.username?.firstname} {review?.username?.lastname}
              </p>
              <p className="text-sm text-richblack-500 -mt-1">{review?.Course?.title}</p>
              </div>
              </div>

              <p className="mt-3 mb-3 text-sm font-semibold">{review?.review}</p>

              <div className="flex mb-3 gap-x-3 items-center">
              <p className="text-yellow-50 font-inter font-semibold">{review?.rating.toFixed(1)}</p>
              <ReactStars
                count={5}
                value={review?.rating}
                size={15}
                edit={false}
                activeColor="#ffd700"
                emptyIcon={<FaStar />}
                filledIcon={<FaStar />}
              />
              </div>
            </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ReviewSlider;
