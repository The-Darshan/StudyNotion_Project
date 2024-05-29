import React, { useEffect, useState } from "react";
import { FaAsterisk } from "react-icons/fa";
import { DevTool } from "@hookform/devtools";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const RequirementField = ({
  name,
  label,
  register,
  errors,
  setValue,
}) => {
  const {editCourse , course} = useSelector((state)=>state.course)
  const {control} = useForm();
  const [requirement, setRequirement] = useState("");
  const [requirementList, setRequirementList] = useState([]);

  useEffect(() => {
    if(editCourse){
      setRequirementList(course?.Instruction)
    }
    register(name, {
      required: true,
      validate: (value) => value.length > 0,
    });
  }, []);

  useEffect(() => {
    setValue(name, requirementList);
  }, [requirementList]);


  const handleAddRequirement = () => {
    if (requirement) {
      setRequirementList([...requirementList, requirement]);
      setRequirement("");
    }
  };

  const handleRemoveRequirement = (indx) => {
    const updatedRequirements = [...requirementList];
    updatedRequirements.splice(indx, 1);
    setRequirementList(updatedRequirements);
  };
  return (
    <div>
      <label className="text-sm" htmlFor={name}>{label}<FaAsterisk className='fill-pink-200 inline w-1.5 mb-3'/></label>
      <div>
        <input
          type="text"
          id={name}
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          className='bg-richblack-700 flex shadow  pl-2 py-3 rounded-lg mr-24 shadow-[#999DAA] font-inter mb-2 w-full text-semibold text-md outline-none'
        />
        <button
        type="button"
          onClick={handleAddRequirement}
          className="font-semibold text-yellow-50"
        >
          Add
        </button>
      </div>

        {requirementList.length > 0 && (
          <ul  className="mt-2 list-inside list-disc flex gap-x-2">
            {requirementList.map((req, indx) => (
              <li key={indx} className="flex items-center text-richblack-5">
                <span className="mr-2">{req}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveRequirement(indx)}
                  className="text-sm text-pure-greys-300"
                >
                  clear
                </button>
              </li>
            ))}
          </ul>
        )}
      {errors[name] && (<span className="text-pink-200 text-sm">{label} is required <FaAsterisk className='fill-pink-200 inline w-1.5 mb-3'/></span>)}
        <DevTool control={control}/>
    </div>
  );
};

export default RequirementField;
