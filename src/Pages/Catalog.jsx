import React, { useEffect, useState } from "react";
import Footer from "../Components/common/Footer";
import { getAllCategories } from "../Services/operations/courseDetailsAPI";
import { getCatalogPageData } from "../Services/operations/CatalogAPI";
import { useParams } from "react-router-dom";
import Course_Card from "../Components/core/Catalog/Course_Card";
import CourseSlider from "../Components/core/Catalog/CourseSlider";

const Catalog = () => {
  const [loading, setLoading] = useState(false);
  const { catalogName } = useParams();
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryID, setCategoryID] = useState("");
  const [selected, setSelected] = useState(true);

  useEffect(() => {
    const getCategories = async () => {
      const result = await getAllCategories();
      const category_id = result.filter(
        (category) =>
          category.name.split(" ").join("-").toLowerCase() === catalogName
      )[0]._id;
      setCategoryID(category_id);
    };
    getCategories();
  }, [catalogName]);

  console.log(catalogPageData);

  useEffect(() => {
    const getCategoryDetails = async () => {
      try {
        const res = await getCatalogPageData(categoryID);
        setCatalogPageData(res);
      } catch (error) {
        console.log(
          "ERROR IN Catalog Page while using useEffect : ",
          error.message
        );
      }
    };
    if (categoryID) {
      getCategoryDetails();
    }
  }, [categoryID]);

  return (
    <div className="font-inter">
      <div className="py-[75px] pl-16 w-full bg-richblack-800">
        <p className="text-richblack-300 text-sm mb-2">
          {"Home / Catalog / "}
          <span className="text-yellow-50">
            {catalogPageData?.selectedCategory?.name}
          </span>
        </p>
        <p className="font-semibold text-3xl mb-2">
          {catalogPageData?.selectedCategory?.name}
        </p>
        <p className="text-richblack-300 w-10/12">
          {catalogPageData?.selectedCategory?.description}
        </p>
      </div>

      <div className="px-16">
        {/* section 1 */}
        <div>
          <div className="flex flex-col mt-10 gap-3 mb-5">
            <p className="text-4xl font-semibold">Courses to get you started</p>
            <div className="flex gap-x-6 text-sm text-richblack-300 border-b border-richblack-600 mt-2 cursor-pointer justify-start">
              <p
                className={`${
                  selected
                    ? "text-yellow-50 border-b border-yellow-50 pb-1 outline-none"
                    : " "
                }`}
                onClick={() => setSelected(true)}
              >
                Most Popular
              </p>
              <p
                className={`${
                  selected
                    ? ""
                    : "text-yellow-50 border-b outline-none border-yellow-50 pb-1"
                }`}
                onClick={() => setSelected(false)}
              >
                New
              </p>
            </div>
          </div>
          <div>
            <CourseSlider Courses={catalogPageData?.publishedCourse} />
          </div>
        </div>

        {/* section 2 */}
        <div className="mt-10">
          <p className="text-4xl font-semibold">
            Top Courses in {catalogPageData?.differentCategory?.name}
          </p>
          <div className="mt-5">
            <CourseSlider Courses={catalogPageData?.differentCategory?.course} />
          </div>
        </div>

        {/* section 3 */}
        <div className="mt-10">
          <p className="text-4xl font-semibold">Frequently Bought</p>
          <div className="py-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {catalogPageData?.topselling?.map((course, indx) => (
                <Course_Card course={course._result} key={indx} Height={"h-[400px]"} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Catalog;
