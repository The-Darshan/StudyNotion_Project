import React from "react";
import HighlightText from "../HomePage/HighlightText";
import CTAbutton from "../HomePage/Button";

const LearningGridArray = [
  {
    order: -1,
    heading: "World-Class Learning for",
    highlightText: "Anyone, Anywhere",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
    BtnText: "Learn More",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "Curriculum Based on Industry Needs",
    description:
      "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
  },
  {
    order: 2,
    heading: "Our Learning Methods",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 3,
    heading: "Certification",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 4,
    heading: `Rating "Auto-grading"`,
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 5,
    heading: "Ready to Work",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
];

const LearningGrid = () => {
  return (
    <div className="grid lg:grid-cols-4 grid-cols-1 mb-12 w-11/12 max-w-maxContent">
      {LearningGridArray.map((card) => {
        return (
          <div
            className={`
            ${card.order === -1 && "lg:col-span-2 lg:h-[280px]  lg:w-fit"}
             ${
              card.order % 2 == 1 ? "bg-richblack-700 lg:h-[280px] p-5" : "bg-richblack-800 lg:h-[280px] p-5"
            } 
            ${card.order === 3 && "lg:col-start-2"}
            ${card.order<0 && "bg-transparent"}
        `} 
            key={card.order}
          >
            {
                card.order<0 ? (<div
                 className="lg:w-[90%] flex flex-col gap-3 justify-start  text-richblack-300  font-inter -translate-y-5">

                    <h1 className="text-4xl text-richblack-5  font-semibold ">{card.heading}
                    <HighlightText text={card.highlightText}/>
                    </h1>

                    <p className="font-medium">
                        {card.description}
                    </p>

                    <div className="w-fit">
                    <CTAbutton active={true} linkedto={card.BtnLink}>
                        {card.BtnText}
                    </CTAbutton>
                    </div>

                </div> 
                )
                :
                (<div className="flex flex-col gap-8 p-7">
                    <h1 className="text-richblack-5 text-lg">
                        {card.heading}
                    </h1>
                    <p className="text-richblack-300 font-medium">
                        {card.description}
                    </p>
                </div>
                )
            }
            {/* According to code key is indx */}
          </div>
        );
      })}
    </div>
  );
};

export default LearningGrid;
