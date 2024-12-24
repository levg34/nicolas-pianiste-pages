import { APIEvent } from '@solidjs/start/server'

export const GET = async ({ params }: APIEvent) => {
    const { pageId } = params
    const proxyUrl = new URL(process.env.BACKEND_URL + '/pages/' + pageId + '/data')

    try {
        const response = await fetch(proxyUrl)

        return new Response(response.body, {
            status: response.status,
            headers: response.headers
        })
    } catch (error) {
        console.error('Error proxying request:', error)
        return new Response('Error proxying request', { status: 500 })
    }
}
