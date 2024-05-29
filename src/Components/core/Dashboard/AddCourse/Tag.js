import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { RxCross1 } from "react-icons/rx";
import { FaAsterisk } from "react-icons/fa";
import { useSelector } from "react-redux";

const Tag = ({
  label,
  name,
  placeholder,
  register,
  errors,
  setValue
}) => {
  const {editCourse , course} = useSelector((state)=>state.course)
  const [TagList, setTagList] = useState([]);

  useEffect(() => {
    if(editCourse){
      setTagList(course?.tag)
    }
    register(name, {
      required: true,
      validate: (value) => value.length > 0,
    });
  }, []);

  useEffect(() => {
    setValue(name, TagList);
  }, [TagList]);


  const setAddTag = (e)=>{
    const tag = (e.target.value.trim())
    if(e.key === "Enter" || e.key === ","){
     if(!TagList.includes(tag)){
      e.preventDefault();
      setTagList([...TagList, tag]);
      e.target.value = "";
     }
     else{
      e.preventDefault();
      toast.error("Tag already exist.")
     }
    }
  }

  const removeTag = (item)=>{
    const removeItem = item.item
    if(TagList.includes(removeItem)){
      setTagList(TagList.filter((tag)=>tag!==removeItem))
    }
  }

  return (
    <div>
      <label className="text-sm" htmlFor={name}>{label} <FaAsterisk className='fill-pink-200 inline w-1.5 mb-3'/></label>
      <div  className="flex w-full flex-wrap gap-x-2 mb-2 mt-1">
      {TagList.length > 0 &&
        TagList.map((item, indx) => (
          <div key={indx} className="flex rounded-full w-fit gap-x-2 px-2 items-center bg-yellow-400 mt-1 mb-2">
            <span>{item}</span>
            <RxCross1 onClick={()=>removeTag({item})}/>
          </div>
        ))}
        </div>
      <input
        type="text"
        id={name}
        placeholder={placeholder}
        className='bg-richblack-700 flex shadow  pl-2 py-3 rounded-lg mr-24 shadow-[#999DAA] font-inter mb-2 w-full text-semibold text-md outline-none'
        onKeyDown={setAddTag}
      />
      {errors[name] && <span className="text-pink-200 text-sm">Enter the {label} <FaAsterisk className='fill-pink-200 inline w-1.5 mb-3'/></span>}
    </div>
  );
};

export default Tag;
