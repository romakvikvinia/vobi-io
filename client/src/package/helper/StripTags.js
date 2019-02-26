const StripTags = str => {
  return str.replace(/(<([^>]+)>)/gi, "");
};
export default StripTags;
