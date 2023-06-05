const mongoose = require("mongoose");

const data = mongoose.Schema(
{
    mail:
    {
        type:String,
        required:[true, "please enter your name"]
    },
    message:
    {
        type:String,
    },
    // secret:
    // {
    //     type:String,
    //     required:[true,"please enter secret key"]
    // }
},
{
    timestamps :true,
}
)
module.exports= mongoose.model("data", data);