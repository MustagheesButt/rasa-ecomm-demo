## Backend

Make sure you have Python 3.7 or 3.8

1. Create a virtual environment

```bash
cd backend
python3 -m venv ./venv
```

Activate it

`source ./venv/bin/activate`

2. Install dependencies

`pip install rasa`

If it gives any errors during installation of some dependencies, simply run `pip uninstall rasa` then `pip install rasa` again. This way `pip` will try to fix the dependencies automatically.

3. Train

`rasa train`

4. Run the Bot

`rasa shell`

OR, run it as a web socket:

`rasa run`

The same command will/should also run it as a REST API. But our frontend connects to it through websockets using socket.io

## Frontend

A simple ecommerce store for demonstrating the bot. Built using plain HTML/CSS and Vanilla JS.

```bash
cd frontend
python3 -m http.server
```