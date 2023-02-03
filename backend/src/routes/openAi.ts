import { FastifyInstance } from 'fastify'
import axios from "axios"
import { z } from 'zod'

const API_KEY = "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"
const ENDPOINT = "https://api.openai.com/v1/images/generations"

export async function openAiRouter(fastify: FastifyInstance) {
	const generateImage = async (description: string): Promise<string> => {
        try {
            const response = await axios.post(ENDPOINT, {
                prompt: description,
                model: "image-alpha-001",
                n: 1,
                size: "1024x1024",
            }, {
                headers: {
                    "Authorization": `Bearer ${API_KEY}`,
                    "Content-Type": "application/json",
                },
            })
    
            const imageUrl = response.data.data[0].url
            return imageUrl
        } catch (error) {
            console.error(error);
            throw error
        }
    }

    fastify.get("/", (request, reply) => {
        reply.send("index.html");
    })
    
    fastify.post("/generate", async (request, reply) => {
        const createDescriptionBody = z.object({
            description: z.string(),
        })

        const { description } = createDescriptionBody.parse(request.body)

        const imageUrl = await generateImage(description)
        reply.status(201).send(imageUrl);
    })


}
