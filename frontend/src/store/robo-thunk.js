import { roboActions } from "./robo-slice";

// cutom action creators
export const fetchRoboData = () => {
  const obj = {};
  const materialList = [];
  // fetch data
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8000/api/robots");
      if (!response.ok) {
        throw new Error("Could not fetch cart data!");
      }
      const dataArr = await response.json();

      dataArr.data.forEach((element) => {
        const date = new Date(element.createdAt).getDate();
        const month = new Date(element.createdAt).getMonth() + 1;
        const year = new Date(element.createdAt).getFullYear();
        element.formattedDate = date + "-" + month + "-" + year;
        // unique material
        if (!obj[element.material]) {
          obj[element.material] = true;
          materialList.push(element.material);
        }
      });

      return dataArr;
    };
    // dispatch action
    try {
      const roboData = await fetchData();
      dispatch(
        roboActions.replaceRobo({
          items: roboData.data || [],
        })
      );
      /** sorting material list array, so that the dropdown list in filter comp, 
      * always remains same
      */
      materialList.sort(function (a, b) {
        var nameA = a.toUpperCase(); // ignore upper and lowercase
        var nameB = b.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        // names must be equal
        return 0;
      });
      dispatch(roboActions.materialList({ materialList }));
    } catch (error) {
      console.log("error: ", error);
    }
  };
};
