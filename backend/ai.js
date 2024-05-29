const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("AIzaSyCkl99N0WdJMusNL_BgZHLYkIo5IC_P2qc");
async function run(prompt) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  return text.toString();
}
const express=require('express')
const app =  express();
console.log("response.data");
var x = "";
let userInput = '';
app.get('/query',async (req,res)=>{
  userInput = req.query.user
  console.log(userInput);
  x= await run(userInput);
  const slicedString = String(x).slice(0, 75);
  res.json({dataa:`${String(slicedString)}`});
  // userInput = String(req.query.user);
  res.end();

})
app.listen(3001,()=>{
  console.log("listening");
})