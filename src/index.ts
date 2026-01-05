import { app } from './server';

const port = 3000;

function main() {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}

main();