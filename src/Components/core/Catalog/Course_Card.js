import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { avgRating } from "../../../utils/avgRatingCalc";
import ReactStars from "react-rating-stars-component";
import { FaStar } from "react-icons/fa";

const Course_Card = ({ course, Height }) => {
  const [averageReviewCount, setAverageReviewCount] = useState(0);
  useEffect(() => {
    const count = avgRating(course?.ratingAndReview);
    setAverageReviewCount(count);
  }, [course]);


  return (
    <div>
      <Link to={`/courses/${course._id}`}>
        <div>
          <div>
            <img
              src={course?.thumbnail}
              alt="Course Thumbnail"
              className={`${Height} w-full rounded-xl object-cover`}
            />
          </div>

          <div>
            <p className="mt-2 mb-1">{course?.title}</p>
            <p className="text-richblack-300 mb-1 text-sm">
              {course?.createdBy?.firstname || course?.result[0]?.firstname} {course?.createdBy?.lastname || course?.result[0]?.lastname}
            </p>
            <div className="mb-2 flex items-center gap-x-1">
              <span className="text-sm font-semibold text-yellow-50">
                {averageReviewCount || 0}
              </span>
              {/* Stars are not changing in reactStars */}
              <ReactStars
                count={5}
                value={Number(averageReviewCount)}
                size={15}
                edit={false}
                activeColor="#ffd700"
                emptyIcon={<FaStar />}
                filledIcon={<FaStar />}
              />
              <span className="text-sm text-richblack-300">
                {course?.ratingAndReview.length} Ratings
              </span>
            </div>
            <p>Rs. {course?.price} </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Course_Card;
