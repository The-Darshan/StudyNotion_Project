export const avgRating = (ratArray) => {

    if(ratArray?.length === 0) return 0;
    
    const totalReviewRating = ratArray?.reduce((acc,curr)=>{
        acc+=curr.rating
        return acc
    },0)

    const multiplier = Math.pow(10,1)
    const avgReviewCount = 
    Math.round((totalReviewRating / ratArray?.length)*multiplier)/multiplier

    return avgReviewCount
}