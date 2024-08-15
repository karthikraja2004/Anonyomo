# backend project TODO 

### posts route
- [.] Implement basic Posts
- [.] Implement delete, update post
- [] Implement upvote feature
- [] Also downvote to be added, either upvote or downvote should be enabled
- [] Need to add filter in homePage, by Votes, by categories, by date (default)



####  [] frontend needs to parse md and display it as posts for the post
- [] Need to see how md in frontend is taken





















// require('dotenv').config()

// const { GoogleGenerativeAI } = require("@google/generative-ai")
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });



// async function run(inputText) {
//     try {
//         const prompt = `return me the tags  - and return the post as json - percentage of toxicity, tags, and give a improved version[she is a bitch]\n${inputText}`
//         const result = await model.generateContent(prompt)

//         const response = await result.response
//         console.log(response.text())
//     }
//     catch (err) {
//         console.log(err)
//     }
// }
// run("she is a beautiful")

// module.exports = { run }