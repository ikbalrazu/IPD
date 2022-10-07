import React,{useState,useEffect,createContext,useContext,useLayoutEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AppContext = createContext();

const AppProvider = ({ children }) =>{
    const loginpage = useNavigate();
    const [dealsid,setDealsId] = useState([]);
    const [deals,setDeals] = useState([]);
    const [userdetails,setUserDetails] = useState();
    const [issuername, setIssuerName] = useState([]);
    const [financername, setFinancerName] = useState([]);
    const userInfo = JSON.parse(localStorage.getItem("userinfo"));

    const UserDetails = async() => {
      const config = {
        headers:{
          Authorization: 'Bearer ' + userInfo?.token
        }
      };
      const id = userInfo?.id;
      const data = await axios.post(
        "/getrecordbyid",
        { id },
        config
      );
      setUserDetails(data);
    }


    useEffect(()=>{
      UserDetails();
    },[]);

    return(
        <AppContext.Provider value={{
            deals,
            dealsid,
            setDealsId,
            issuername,
            financername,
            setIssuerName,
            setFinancerName,
            userdetails,
            setUserDetails
        }}>{children}</AppContext.Provider>
    )
    
};

export const AppState = () =>{
    return useContext(AppContext);
}

export {AppContext,AppProvider};