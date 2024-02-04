import OpenAI from "openai";
export default async function handler(req, res) {
    const {name} = req.body
    const openai = new OpenAI({
      api_key: process.env.OPENAI_API_KEY
    });

    const textCompletion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "Please geneate name for the animal:"+name+". I want 5 names for the output." }],
      model: "gpt-3.5-turbo",
    })

     // Extract the generated names
    const generatedText = textCompletion.choices[0];

    //  //Generate an image using DALL-E 3
     const image = await openai.images.generate({
        model: "dall-e-3",
        prompt: "Generate one sample picture for animal " + name, // Use the name received in the request
        n: 1,
        size: "1024x1024",
      });
 
     res.status(200).json({
       text: generatedText,
       image: image.data // This will be a URL to the generated image
     });
    //res.status(200).json(generatedText);

}
