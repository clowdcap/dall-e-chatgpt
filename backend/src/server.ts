import Fastify from "fastify"
import cors from "@fastify/cors"
import { openAiRouter } from "./routes/openAi"

// logger mostra todo o log do sistema
async function bootstrap() {
    const fastify = Fastify({
        logger: true
    })

    await fastify.register(cors, {
        origin: true
    })

    fastify.register(openAiRouter)
    
	// ligar o server
	await fastify.listen({ port: 5000 })
}

// inicia o fastify
bootstrap()
