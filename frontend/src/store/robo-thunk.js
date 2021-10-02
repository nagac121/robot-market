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
        // format date
        const date = new Date(element.createdAt).getDate();
        const month = new Date(element.createdAt).getMonth() + 1;
        const year = new Date(element.createdAt).getFullYear();
        element.formattedDate = date + "-" + month + "-" + year;
        // material list for filter ddl
        if (!obj[element.material]) {
          obj[element.material] = true;
          materialList.push(element.material);
        }
        // add qty for each item
        element.qty = 0;
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
      materialList.sort();
      dispatch(roboActions.materialList({ materialList }));

      // prepare material map
      const materialMap = {};
      for (const material of materialList) {
        materialMap[material] = 0;
      }
      dispatch(roboActions.updateMaterialCount({ materialMap, userAction: "createMaterialMap" }));
    } catch (error) {
      console.log("error: ", error);
    }
  };
};
