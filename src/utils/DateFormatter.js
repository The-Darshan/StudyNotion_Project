export const dateFormatter = (date) => {
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return  new Date(date).toLocaleDateString('en-US', options);
}