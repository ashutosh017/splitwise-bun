import { app } from './server';

const port = 3001;

function main() {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}

main();