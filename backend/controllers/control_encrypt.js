const asyncHandler = require("express-async-handler");
const data = require('../models/modelData')
const {encrypt,decrypt} = require('../encrypt_decrypt/functions')
const dotenv = require("dotenv").config();
const nodemailer = require("nodemailer")
const { Configuration, OpenAIApi } = require("openai") ;

const openAi = new OpenAIApi(
    new Configuration({
      apiKey: process.env.OPEN_AI_API_KEY,
    })
  )
  

  


async function send_mail(email, message) {
    let testAccount = await nodemailer.createTestAccount();
  
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: 'sendm4714@gmail.com',
            pass: 'iagglnsomzngpndu'
        }
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: "no-reply@info.com", // sender address
      to: email, // list of receivers
      subject: "Here's a message for you !!", // Subject line
      text: `https://anonymously-yours.onrender.com/${message}`, // plain text body
    });

    // console.log("Message sent: %s", info.messageId);
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));



}


const postData = asyncHandler(
    async(req,res)=>
    {
        console.log("the message is ", req.body)
        var {mail, message} = req.body;

        
        const input=`is this message abusive, sexual, threatening or bullying : ${message}. Check whether its abusive if translated to odia, hindi, urdu, korean, telegu and tamil. Answer only in one word i.e "True" or "False". Don't give any reasoning. Answer as per instruction`
        const response = await openAi.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: input }],
          })
          const decide = response.data.choices[0].message.content;
          const decide1= decide.slice(0,4)
          console.log(decide)
          const decide2 = decide.slice(0,5)

       const refine =(decide)=>{
        if(decide2=="False" || decide==="False")
        {
            console.log(false)
                return false
        }
        else if(decide1=="True" || decide==="True")
        {
            console.log(true)
            return true
           
        }
        else return null
       }
       
        if(!mail || !message)
        {
            res.status(404);
            throw new Error("error! Can't be empty");

        }

        else if(refine(decide))
        {

            res.status(408);
            throw new Error("Message not ethical");
        }
        else{
        const message_new = encrypt(message, process.env.SECRET_KEY)
        const mail_new = encrypt(mail, process.env.SECRET_KEY)
        // console.log(message_new)
        message= message_new
        mail=mail_new
        const info = await data.create(
            {
                mail,
                message
            }
        );
        res.status(201).json(info)
        get_mail = decrypt(mail, process.env.SECRET_KEY)
        send_mail(get_mail,info.id)
        }
        
      
        
    }

)

const getData = asyncHandler(
    async(req,res)=>
    {
    var info = await data.findByIdAndDelete(req.params.id);
    const new_msg = decrypt(info.message, process.env.SECRET_KEY)
    if(!info)
    {
        res.status(404)
        throw new Error('error, no such message')
    }
    res.status(200).json(new_msg);
    }
)
module.exports = {postData,getData}