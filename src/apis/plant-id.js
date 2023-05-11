import axios from "axios";
export const getPlant = async (data)=>{
    return await axios.post('https://localhost:44303/api/PlantIdentification',data)
    .then(response => response.data)
    .catch((error) => {
      return error
    });
  };
  export const getPlantHealth = async (data)=>{
    return await axios.post('https://localhost:44303/api/HealthAssessment',data)
    .then(response => response.data.health_assessment)
    .catch((error) => {
      return error
    });
  };