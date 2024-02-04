Instructions to Run Backoffice Server:
=======================================

Open your terminal and navigate to the main path of the project, "Backoffice," using the cd command:

```bash
cd /Backoffice
```

Run the following command in the terminal to install the project dependencies:

```bash
npm install
```

Edit hosts file: (e.g.: C:\Windows\System32\drivers\etc\hosts on windows)
127.0.0.1		local-backoffice.komsai.com
127.0.0.1		dev-backoffice.komsai.com
127.0.0.1		backoffice.komsai.com

Then run this command to start your server, depending on your enviorment:

To run on local server
```bash
npm run local
```

To run in development mode:
```bash
npm run dev
```

To run in production mode:
First, build the project:
```bash
npm run build
```
Then, start the server in your production environment:
```bash
npm run start
```
