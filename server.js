const axios = require("axios");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const multer = require("multer");
const fileupload = require("express-fileupload");
const FormData = require("form-data");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const NodeCache = require("node-cache");
const https = require("https");
const myCache = new NodeCache({ stdTTL: 3000 });
const path = require("path");
const generateToken = require('./confiq/generateToken');
const authMiddleware = require('./middleware/authMiddleware');

const mime = require("mime");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT || 5000;

var transporter = nodemailer.createTransport({
  service: process.env.MAIL_MAILER,
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,

  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },

});




const UPLOADS_FOLDER = "./uploads/";
//define the storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

app.get("/", (req, res) => {
  res.send("Investment Portal");
});


//Login User
app.post("/w3s/v1/loginuser",async(req,res)=>{
  const {email,encodepass} = req.body;
  const access_token = await AccessToken(req);
  await axios
    .get(
      `${process.env.ZOHO_API}/report/All_Users?criteria=(Email="${email}") %26%26 (Password="${encodepass}")`,
      {
        headers: {
          Authorization: `Zoho-oauthtoken ${access_token}`,
        },
      }
    )
    .then(function (response) {
      //console.log(response.data.data[0].ID);
      console.log(response.data);
      //res.json(response.data.message);
      res.json({
        data:response.data.data,
        token:generateToken(response.data.data[0].ID,response.data.data[0].Password),
      });

    }).catch(function (error) {
      console.log(error.message);
      res.json(error.message);
    });
})

//Add Records
app.post("/w3s/v1/addrecord", async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    phone,
    company,
    dealsaccess,
    companyrole,
    jobrole,
  } = req.body;

  const access_token = await AccessToken(req);

  console.log("Access token",access_token);

  await axios
    .post(
      `${process.env.ZOHO_API}/form/User`,
      {
        data: {
          Email: email,
          UserStatus: "Pending",
          Name: {
            first_name: firstname,
            last_name: lastname,
          },
          Phone_Number: phone,
          Company: company,
          Deals_need_access_to: dealsaccess,
          Company_Role: companyrole,
          Role: jobrole,
        },
      },
      {
        headers: {
          Authorization: `Zoho-oauthtoken ${access_token}`,
        },
      }
    )
    .then(function (response) {
      console.log(response);
      res.status(200).json(response.data);
    })
    .catch(function (error) {
      console.log(error);
      res.json(error.message);
    });
});

//Get Data from URL in NodeJS
app.get("/w3s/v1/setuserpassword", function (req, res) {
  var id = req.query.id;
  var email = req.query.email;
  const jwtToken = jwt.sign({ userId: id }, process.env.JWT_SECRET, {
    expiresIn: "5m",
  });
  console.log(jwtToken);
  console.log(id);
  console.log(email);
  var mailOptions = {
    from: ' "Set Your Password" <amalinvestorportal@gmail.com>',
    to: email,
    subject: "Set Password Link - Investment Portal",
    html: `<p>Your email: ${email}! </p> <p>Your user id: ${id}! </p><p>You requested for Set password, kindly use this <a href="${process.env.Frontent_URL}/setuserpassword/${id}/${jwtToken}">Link</a> to set your password</p>`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.json(error.message);
      //console.log(email);
    } else {
      res.json({ message: "send email successfully" });
      console.log("Email sent: " + info.response);
    }
  });
});



//get data by specific id
app.post("/w3s/v1/getrecordbyid",authMiddleware, async (req, res) => {
  const { id } = req.body;

  const access_token = await AccessToken(req);

  await axios
    .get(
      `${process.env.ZOHO_API}/report/All_Users/${id}`,
      {
        headers: {
          Authorization: `Zoho-oauthtoken ${access_token}`,
        },
      }
    )
    .then(function (response) {
      console.log(response);
      res.status(200).json(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});


app.post("/w3s/v1/sendForgotPasswordMail", (req, res) => {
  const { resetemail, id } = req.body;
  const jwtToken = jwt.sign({ userId: id }, process.env.JWT_SECRET, {
    expiresIn: "5m",
  });
  console.log(jwtToken);
  console.log(id);
  console.log(resetemail);
  var mailOptions = {
    from: ' "Reset Your Password" <amalinvestorportal@gmail.com>',
    to: resetemail,
    subject: "Reset Password Link - Investment Portal",
    html: `<p>Your email: ${resetemail}! </p><p>Your id: ${id}</p> <p>You requested for reset password, kindly use this <a href="${process.env.Frontent_URL}/resetpassword/${id}/${jwtToken}">Link</a> to reset your password</p>`,
  };

  

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.json(error.message);
      //console.log(email);
    } else {
      res.json({ message: "send email successfully" });
      console.log("Email sent: " + info.response);
    }
  });
});

app.post("/w3s/v1/verifyForgotMail", (req, res) => {
  const { token } = req.body;
  jwt.verify(token, process.env.JWT_SECRET, function (err) {
    if (err) {
      res.json({ result: "Link expired" });
    }
    res.json({ result: "Valid Link" });
  });
});

app.post("/w3s/v1/verifyauthtoken", (req, res) => {
  const { token } = req.body;
  jwt.verify(token, process.env.JWT_SECRET, function (err, token) {
    if (err) {
      res.json({ result: "Link expired" });
    }
    res.json({ result: "Valid Link" });
  });
});

app.post("/w3s/v1/sendOTPVerificationEmail", (req, res) => {
  const { email, otpPin } = req.body;
  console.log("email:", email);
  console.log("OTP: ", otpPin);
  var mailOptions = {
    from: ' "Verify Account" <amalinvestorportal@gmail.com>',
    to: email,
    subject: "Two Factor Authentication - Investment Portal",
    html: `<p>Your email: ${email}! </p><p>Your PIN</p><h1>${otpPin}</h1>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      //console.log(error);
      res.json(error.message);
      console.log(email);
    } else {
      res.json({ message: "send email successfully" });
      //console.log('Email sent: ' + info.response);
    }
  });
});


//get documents data by id
app.post("/w3s/v1/getdocumentsbyid", async (req, res) => {
  const { id } = req.body;
  const access_token = await AccessToken(req);

  await axios
    .get(
      `${process.env.ZOHO_API}/report/All_Documents/${id}`,
      {
        headers: {
          Authorization: `Zoho-oauthtoken ${access_token}`,
        },
      }
    )
    .then(function (response) {
      console.log(response);
      res.status(200).json(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

//get all documents
app.post("/w3s/v1/getalldocuments", async (req, res) => {
  const access_token = await AccessToken(req);
  await axios
    .get(
      `${process.env.ZOHO_API}/report/All_Documents`,
      {
        headers: {
          Authorization: `Zoho-oauthtoken ${access_token_getdata}`,
        },
      }
    )
    .then(function (response) {
      console.log(response);
      res.status(200).json(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

//get all deals data
app.post("/w3s/v1/getdealsbyid", async (req, res) => {
  const access_token = await AccessToken(req);

  await axios
    .get(
      `${process.env.ZOHO_API}/report/All_Deals/${dealid}`,
      {
        headers: {
          Authorization: `Zoho-oauthtoken ${access_token}`,
        },
      }
    )
    .then(function (response) {
      console.log(response);
      res.status(200).json(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.get("/w3s/v1/alldocdownload", async (req, res) => {
  const access_token = await AccessToken(req);
  const id = req.query.id;
  const filename = req.query.filename;

  const file = fs.createWriteStream(filename);

  const request = https.get(
    `${process.env.ZOHO_API}/report/All_Documents/${id}/Documents/download`,
    {
      headers: {
        Authorization: `Zoho-oauthtoken ${access_token}`,
      },
    },

    function (response) {
      response.pipe(file);

      // after download completed close filestream
      file.on("finish", () => {
        file.close();
        res
          .status(200)
          .json(process.env.API_URL + "/download?filename=" + filename);
      });
    }
  );
});

app.get("/download", function (req, res) {
  const name = req.query.filename;

  var file = __dirname + "/" + name;
  // res.status(200).json(file);

  var filename = path.basename(file);
  var mimetype = mime.lookup(file);

  res.setHeader("Content-disposition", "attachment; filename=" + filename);
  res.setHeader("Content-type", mimetype);

  var filestream = fs.createReadStream(file);
  filestream.pipe(res);
});



//allglobaldocuments
app.get("/w3s/v1/allglobaldocuments",authMiddleware, async (req, res) => {

  const access_token = await AccessToken(req);
  await axios
    .get(
      `${process.env.ZOHO_API}/report/All_Documents?Access_Type=Global`,
      {
        headers: {
          Authorization: `Zoho-oauthtoken ${access_token}`,
        },
      }
    )
    .then(function (response) {
      console.log(response);
      res.status(200).json(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

//
app.get("/w3s/v1/getalldeals", async (req, res) => {
  const access_token = await AccessToken(req);

  await axios
    .get(
      `${process.env.ZOHO_API}/report/All_Deals`,
      {
        headers: {
          Authorization: `Zoho-oauthtoken ${access_token}`,
        },
      }
    )
    .then(function (response) {
      console.log(response);
      res.status(200).json(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.post("/w3s/v1/documentswithdealsid", async (req, res) => {
  const { dealid } = req.body;
  console.log(dealid);
  const access_token = await AccessToken(req);
  await axios.get(`${process.env.ZOHO_API}/report/All_Documents?criteria=(Access_Type="Private")  %26%26 (Deals.ID=${dealid})`, {
    headers: {
      Authorization: `Zoho-oauthtoken ${access_token}`
    },
  })
    .then(function (response) {
      console.log(response);
      res.status(200).json(response.data);
    })
    .catch(function (error) {
      //console.log(error);
    })

})

app.get("/w3s/v1/memorycache", async (req, res) => {
  const access_token = await AccessToken(req);

  res.status(200).json(access_token);
  await axios
    .get(
      `${process.env.ZOHO_API}/report/All_Deals`,
      {
        headers: {
          Authorization: `Zoho-oauthtoken ${access_token}`,
        },
      }
    )
    .then(function (response) {
      console.log(response);
      res.status(200).json(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

function GetDate(){
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
var today = new Date();
var date =
  today.getDate() +
  "-" +
  monthNames[today.getMonth()] +
  "-" +
  today.getFullYear()+" "+today.getHours()+":"+today.getMinutes()+":"+today.getSeconds()
return date;
}

function getUser(authtoken){
  
  if (
    authtoken &&
    authtoken.startsWith("Bearer")
  ) {
    try {
      const token = authtoken.split(" ")[1];
      var decoded = jwt.decode(token);
      return decoded;
    } catch (error) {
      return false;
    }
  }

  return false;

}

async function AccessToken(request) {
  
  if (myCache.has("accesstoken")) {
    return myCache.get("accesstoken");
  } else {
    await axios
      .post(
        `${process.env.ZOHO_ACCESS_TOKEN}=${process.env.REFRESH_TOKEN}&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&grant_type=refresh_token`
      )
      .then(function (response) {
        access_token_getdata = response.data.access_token;
        console.log("access token: ",access_token_getdata);
        myCache.set("accesstoken", access_token_getdata);

        const user = getUser(request.headers.authorization);
    
        if(user?.id && user?.password){
          const getdate = GetDate();
          axios
        .patch(
          `${process.env.ZOHO_API}/report/All_Users/${user.id}`,
          {
            data: {
              Last_Login_Date: getdate
              // Password: user.password
            },
          },
          {
            headers: {
              Authorization: `Zoho-oauthtoken ${access_token_getdata}`,
            },
          }
        )
        }
        
        return access_token_getdata;
      })
    
    return myCache.get("accesstoken");
  }
}


app.post("/w3s/v1/dealswithuserid",authMiddleware, async (req, res) => {
  const { dealid } = req.body;
  console.log(dealid);
  let access_token;

  if (myCache.has("accesstoken")) {
    console.log("from cache");
    access_token = myCache.get("accesstoken");
  } else {
    await axios
      .post(
        `https://accounts.zoho.com.au/oauth/v2/token?refresh_token=${process.env.REFRESH_TOKEN}&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&grant_type=refresh_token`
      )
      .then(function (response) {
        access_token_getdata = response.data.access_token;
        console.log("without cache");
        myCache.set("accesstoken", access_token_getdata);
        access_token = myCache.get("accesstoken");
      });
  }

  await axios
    .get(
      `${process.env.ZOHO_API}/report/All_Deals?criteria=ID=[${dealid}]`,
      {
        headers: {
          Authorization: `Zoho-oauthtoken ${access_token}`,
        },
      }
    )
    .then(function (response) {
      //console.log(response);
      res.status(200).json(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.put("/w3s/v1/checkboxhandler", async (req, res) => {
  const { id, checked, password } = req.body;
  console.log("user id: ", id);
  let access_token_updatedata;
  axios
    .post(
      `https://accounts.zoho.com.au/oauth/v2/token?refresh_token=${process.env.REFRESH_TOKEN_updatedata}&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&grant_type=refresh_token`
    )
    .then(function (response) {
      access_token_updatedata = response.data.access_token;
    })
    .then(function (data) {
      console.log(
        "access token created for update Record: ",
        access_token_updatedata
      );
      axios
        .patch(
          `${process.env.ZOHO_API}/report/All_Users/${id}`,
          {
            data: {
              Email_When_Document_Uploaded: checked,
              Password: password,

            },
          },
          {
            headers: {
              Authorization: `Zoho-oauthtoken ${access_token_updatedata}`,
            },
          }
        )
        .then(function (response) {
          console.log(response);
          res.status(200).json(response.data);
        })
        .catch(function (error) {
          console.log(error);
          res.json(error.message);
        });
    })
    .catch(function (error) {
      access_token_updatedata = error;
    });
})



app.post("/w3s/v1/checkuseremail", async (req, res) => {
  const { resetemail } = req.body;
  console.log(resetemail);
  const access_token = await AccessToken(req);
  await axios.get(`${process.env.ZOHO_API}/report/All_Users?criteria=Email.endsWith("${resetemail}")`, {
    headers: {
      Authorization: `Zoho-oauthtoken ${access_token}`
    },
  })
    .then(function (response) {
      console.log(response);
      res.status(200).json({data:response.data.data,message:"Email Found"});
    })
    .catch(function (error) {
      //console.log(error);
      res.json("Email Not Found");
    })

})

app.put("/w3s/v1/reset-password",async (req, res) => {
  const { id, password } = req.body;
  console.log("Password: ", password);
  const access_token = await AccessToken(req);
      axios
        .put(
          `${process.env.ZOHO_API}/report/All_Users/${id}`,
          {
            data: {
              Password: password,
            },
          },
          {
            headers: {
              Authorization: `Zoho-oauthtoken ${access_token}`,
            },
          }
        )
        .then(function (response) {
          console.log(response);
          res.status(200).json(response.data);
        })
        .catch(function (error) {
          console.log(error);
          res.json(error.message);
        });
    
});

async function SearchDeals(access_token,req,res){
  const {module,query,value} = req.body;
  const userid = getUser(req.headers.authorization);
  const id = userid?.id;
  console.log("user id",userid?.id);
  await axios
    .get(
      `${process.env.ZOHO_API}/report/All_Users/${id}`,
      {
        headers: {
          Authorization: `Zoho-oauthtoken ${access_token}`,
        },
      }
    )
    .then(function (response) {
      //console.log(response.data);
      const deals = response?.data?.data?.Deals_Allowed_for_Access;
      let dealstring = "";
      deals.map((data,index)=>{
        
        
        if(index === 0){
          dealstring = dealstring + (data.ID)?.toString();
        }else{
          dealstring = dealstring + ","+(data.ID)?.toString();
        }
      })
      
      return dealstring;
      
    }).then(function(dealsid){
      console.log(dealsid);
      if(dealsid.length > 0){
        axios
    .get(
      `${process.env.ZOHO_API}/report/All_Deals?criteria=${query}.contains("${value}")  %26%26  (ID=[${dealsid}])`,
      {
        headers: {
          Authorization: `Zoho-oauthtoken ${access_token}`,
        },
      }
    )
    .then(function (response) {
      console.log(response);
      //res.status(200).json(response.data);
      res.status(200).json({data:response.data,ModuleName:module,QueryName:query,ValueName:value});
    })
    .catch(function (error) {
      console.log(error);
    });
    }
      
    })
    .catch(function (error) {
      res.json(error);
      console.log(error);
    });
}



app.post("/w3s/v1/search",async(req,res)=>{
  const {module,query,value} = req.body;
  console.log("module name: ",module);
  const access_token = await AccessToken(req);
  if(module === "All_Deals"){
    SearchDeals(access_token,req,res);
    
  }else{
    await axios
    .get(
      `${process.env.ZOHO_API}/report/All_Documents?criteria=${query}.contains("${value}")  %26%26  (Access_Type="Global")`,
      {
        headers: {
          Authorization: `Zoho-oauthtoken ${access_token_getdata}`,
        },
      }
    )
    .then(function (response) {
      console.log(response);
      res.status(200).json({data:response.data,ModuleName:module,QueryName:query,ValueName:value});
      //res.status(200).json(response.data);
    })
    .catch(function (error) {
      res.json(error);
      console.log(error);
    });
  }
  
})


app.listen(port, function (error) {
  if (error) {
    console.log("server failed");
  } else {
    console.log("server success");
  }
});
