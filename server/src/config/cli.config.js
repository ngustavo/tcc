import readline from 'readline'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

const User = {}

rl.question('Enter user name: ', (value) => {
    rl.close()
    console.log(`Saving "${value}" to database...`);
    (async () => {
        try {
            const r = await User.create({
                name: value || 'T', surname: 'Cat', phone: '888', address: 'Av Brasil, 500',
            })
            console.log(`Saved "${r.name}"`)
        } catch (error) {
            console.log(error)
        }
    })()
})
