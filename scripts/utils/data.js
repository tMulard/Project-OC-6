export const getData = async () => {
  try {
    const response = await fetch("../data/photographers.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getIdFromUrl = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  return id;
}