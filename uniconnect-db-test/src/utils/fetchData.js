import axios from "axios";

export default async function fetchData(
  endpoint,
  setState,
  selectedRole,
  options = {},
  dataType = ""
) {
  // console.log("kk", selectedRole);
  try {
    const response = await axios({
      url: `http://localhost:3000${endpoint}?selectedRole=${selectedRole}`,
      method: options.method || "GET",
      data: options.body,
    });
    if (dataType !== "") {
      setState({
        dataType: dataType,
        data: response.data,
      });
    } else {
      setState(response.data);
    }
  } catch (error) {
    console.error("Error fetching data", error);
  }
}
