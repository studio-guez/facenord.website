export default defineEventHandler(async (event) => {

    const email = process.env.API_AUTH_EMAIL
    const password = process.env.API_AUTH_PASSWORD

    const authHeader = Buffer.from(`${email}:${password}`, 'utf-8').toString('base64');

    const body = await readBody(event)

    console.log('Sending Auth for:', email);
    console.log('Generated Header:', `Basic ${authHeader}`);

    const dataApi = await $fetch(`${process.env.API_URL}/api/query`, {
        lazy: true,
        method: 'POST',
        headers: {
            'Authorization': `Basic ${authHeader}`
        },
        body,
    })

    if (!dataApi || dataApi.status === 'error') {
        return { result: [] }; // Returns an empty iterable so the frontend doesn't crash
    }

    return dataApi
})


