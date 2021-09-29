import { roboActions } from "./robo-slice";

// cutom action creators
export const fetchRoboData = () => {
  // fetch data
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8000/api/robots");
      if (!response.ok) {
        throw new Error("Could not fetch cart data!");
      }
      const dataArr = await response.json();
      console.log("dataArr: ", dataArr);

      dataArr.data.forEach((element) => {
        const date = new Date(element.createdAt).getDate();
        const month = new Date(element.createdAt).getMonth() + 1;
        const year = new Date(element.createdAt).getFullYear();
        element.formattedDate = date + "-" + month + "-" + year;
      });
      return dataArr;
    };
    // dispatch action
    try {
      const roboData = await fetchData();
      console.log("robodata: ",roboData)
      dispatch(
        roboActions.replaceRobo({
          items: roboData.data || [],
        })
      );
    } catch (error) {
      console.log("error: ", error);
    }
  };
};
