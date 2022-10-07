import axios from "axios";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const searchData = [
    {
        label: "Deal",
        value: "All_Deals",
        data: [
            {
                label: "Deal Name",
                value: "DealName",
            },
            {
                label: "Deal Type",
                value: "DealType",
            },
            {
                label: "Deal Administrator",
                value: "Deal_Administrator",
            },
            {
                label: "Issuer Name",
                value: "Issuer_Name",
            },
            {
                label: "Financer Name",
                value: "Financer",
            },
        ],
    },
    {
        label: "Documents",
        value: "All_Documents",
        data: [
            {
                label: "Document Name",
                value: "DocumentName",
            },
        ],
    },
];

const AdvanceSearch = () => {
    const searchpage = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem("userinfo"));
    useEffect(() => {
        defaultChid();
    }, []);

    const [allChild, setAllChild] = useState([]);
    const [searchdata,setSearchData] = useState();
    const moduleInputRef = useRef();
    const moduleRef = useRef();
    const childDataRef = useRef();

    const config = {
        headers:{
          Authorization: 'Bearer ' + userInfo?.token
        }
      };

    const handleSubmit = async(e) => {
        e.preventDefault();
        const value = moduleInputRef.current.value;
        const module = moduleRef.current.value;
        const query = childDataRef.current.value;
        //console.log({ module, query, value });
        const {data} = await axios.post("/search",{module,query,value},config);
        setSearchData(data?.data);
        //console.log(data?.data);
        searchpage("/search", {state:data});
    };

    return (
        <div className="pt-5 ">
            <form className="container" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-lg-2 col-md-2 col-sm-12 col-12 py-2 px-1">
                    <select
                        className="form-select rounded-0"
                        onChange={handleChangeModule}
                        ref={moduleRef}
                    >
                        {searchData.map((option, key) => (
                            <option value={option.value} data-key={key}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    </div>
                    
                    <div className="col-lg-2 col-md-2 col-sm-12 col-12 py-2 px-1">
                    <select
                        className="form-select rounded-0"
                        ref={childDataRef}
                    >
                        {allChild.map((list) => (
                            <option
                                style={{
                                    width: "50%",
                                }}
                                value={list.value}
                            >
                                {list.label}
                            </option>
                        ))}
                    </select>
                    </div>
                    

                    <div className="col-lg-6 col-md-6 col-sm-12 col-12 py-2 px-1">
                    <input
                        className="form-control rounded-0"
                        ref={moduleInputRef}
                        type="text"
                        placeholder="Search"
                        id="searh"
                        name="searh"
                    />
                    </div>
                    
                    <div className="col-lg-2 col-md-2 col-sm-12 col-12 py-2 px-1">
                    <button
                        style={{ backgroundColor: '#00ADEE'}}
                        className="btn btn-primary  border-0 rounded-0"
                        type="submit"
                    >
                        Show Results
                    </button>
                    </div>
                    
                </div>
            </form>
        </div>
    );

    function handleChangeModule(e) {
        var index = e.target.selectedIndex;
        var key = e.target.childNodes[index].getAttribute("data-key");
        setAllChild(searchData[key]?.data);
    }
    function defaultChid() {
        setAllChild(searchData[0]?.data);
    }
};

export default AdvanceSearch;
