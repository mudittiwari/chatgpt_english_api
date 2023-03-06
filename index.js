const express = require('express');
const { Configuration, OpenAIApi } = require("openai");
const app = express();
app.use(express.json());


// functionality of the application that are to be added.
// 1. user can enter the sentence in english and the application will convert it to hindi.
// 2. user can enter the sentence in hindi and the application will convert it to english.
// 3. user can enter the sentence in english and the application will correct the grammer of the sentence.
// 4. user can enter the sentence in hindi and the application will correct the grammer of the sentence.
// 5. user can enter the sentence in english and the application will give the meaning of the sentence.
// 6. user can enter the sentence in hindi and the application will give the meaning of the sentence.
// 7. user can enter the sentence in english and the application will give the best alternative of the sentence.
// 8. user can enter the sentence in hindi and the application will give the best alternative of the sentence.
// 9. user can enter the sentence in english and the application will tell the sentiment of the sentence.
// 10. user can enter the sentence in hindi and the application will tell the sentiment of the sentence.

const configuration = new Configuration({
    organization: "org-EbgLmifrADwS5VwNsFLquaGc",
    apiKey: "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",
    
});
const openai = new OpenAIApi(configuration);

async function check_language(sentence) {
    let ans;
    await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "check the language of the sentence.............." + sentence,
        max_tokens: 1000,
    }).then((res) => {
        // console.log(res.data.choices[0].text)
        ans= res.data.choices[0].text;
    });
    return ans;
    
}


app.post('/translate', async (req, res) => {
    const { sentence, language } = req.body;
    if (language === "english") {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: "translate the sentence from english to hindi.............." + sentence,
            max_tokens: 1000,
        });
        console.log(completion.data.choices[0].text);
        res.send(completion.data.choices[0].text);
    }
    else if (language === "hindi") {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: "translate the sentence from hindi to english.............." + sentence,
            max_tokens: 1000,
        });
        console.log(completion.data.choices[0].text);
        res.send(completion.data.choices[0].text);
    }
});

app.post('/grammer', async (req, res) => {
    const { sentence } = req.body;
    let lang; 
    await check_language(sentence).then((res) => {
        lang= res;
    });
    const completion1 = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "correct the grammer of the sentence.............." + sentence,
        max_tokens: 1000,
    });
    lang=lang.toString().trim()
    if(lang == "English" || lang == "english"){
        const completion2 = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: "translate the given sentence to english.............." + completion1.data.choices[0].text,
            max_tokens: 1000,
        });
    console.log(completion2.data.choices[0].text);
    res.send(completion2.data.choices[0].text);
    }
    if(lang === "hindi" || lang === "Hindi"){
        const completion2 = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: "translate the given sentence to hindi.............." + completion1.data.choices[0].text,
            max_tokens: 1000,
        });
    console.log(completion2.data.choices[0].text);
    res.send(completion2.data.choices[0].text);
    }
});

app.post('/meaning', async (req, res) => {
    let lang; 
    const { sentence} = req.body;
    await check_language(sentence).then((res) => {
        lang= res;
    });
    
    const completion1 = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "tell the meaning of the sentence in english.............." + sentence,
        max_tokens: 1000,
    });
    lang=lang.toString().trim()
    if(lang == "English" || lang == "english"){
        const completion2 = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: "translate the given sentence to english.............." + completion1.data.choices[0].text,
            max_tokens: 1000,
        });
    console.log(completion2.data.choices[0].text);
    res.send(completion2.data.choices[0].text);
    }
    if(lang === "hindi" || lang === "Hindi"){
        const completion2 = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: "translate the given sentence to hindi.............." + completion1.data.choices[0].text,
            max_tokens: 1000,
        });
    console.log(completion2.data.choices[0].text);
    res.send(completion2.data.choices[0].text);
    }
});


app.post('/alternative', async (req, res) => {
    let lang; 
    const { sentence } = req.body;
    await check_language(sentence).then((res) => {
        // console.log(res)
        lang= res;
    });
    const completion1 = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "tell the best alternative of the sentence.............." + sentence,
        max_tokens: 1000,
    });
    // console.log(completion1.data.choices[0].text);
    lang=lang.toString().trim()
    if(lang == "English" || lang == "english"){
        const completion2 = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: "translate the given sentence to english.............." + completion1.data.choices[0].text,
            max_tokens: 1000,
        });
    console.log(completion2.data.choices[0].text);
    res.send(completion2.data.choices[0].text);
    }
    if(lang === "hindi" || lang === "Hindi"){
        const completion2 = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: "translate the given sentence to hindi.............." + completion1.data.choices[0].text,
            max_tokens: 1000,
        });
    console.log(completion2.data.choices[0].text);
    res.send(completion2.data.choices[0].text);
    }
});

app.post('/sentiment', async (req, res) => {
    
    const { sentence } = req.body;
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "tell the sentiment of the sentence either good or bad.............." + sentence,
        max_tokens: 1000,
    });
    console.log(completion.data.choices[0].text);
    res.send(completion.data.choices[0].text);
});

app.listen(process.env.PORT || 5000, () => {
    console.log("backend server is running");

})