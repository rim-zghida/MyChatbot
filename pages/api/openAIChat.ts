// import type { NextApiRequest, NextApiResponse } from "next"
// import OpenAI from 'openai';

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   console.log("req.body", req.body.messages)
//   const chatCompletion = await openai.chat.completions.create({
//     model: "gpt-3.5-turbo",
//     messages: req.body.messages,
//   })
//   console.log("thisismychatcompletion");
//   console.log(chatCompletion);
//   console.log(chatCompletion.choices[0].message);

//    res.status(200).json({ result: chatCompletion.choices[0].message })
// }

// import { log } from "console";
// import type { NextApiRequest, NextApiResponse } from "next";
// import { Configuration, OpenAIApi } from "openai";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const configuration = new Configuration({
//     apiKey: "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",
//   });
//   const openai = new OpenAIApi(configuration);

//   try {
//     const completion = await openai.createChatCompletion({
//       model: "gpt-3.5-turbo",

//       messages: req.body.messages,
//     });
//     res.status(200).json({ result: completion.data });
//   } catch (error) {
//     log("error", error);
//     res.status(500).json({ error: error });
//   }

//   console.log("req.body", req.body.messages);
// }

// pages/api/createMessage.ts

import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

export default async function createMessage(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { messages } = req.body;
  const apiKey = process.env.OPENAI_API_KEY;
  const url = "https://api.openai.com/v1/chat/completions";
  const body = JSON.stringify({
    messages,
    model: "gpt-3.5-turbo", // Use the desired model (e.g., gpt-3.5-turbo)
    stream: false,
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body,
    });

    const data = await response.json();
    console.log("====================================");
    console.log(data);
    console.log("====================================");
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error: error });
  }
}
