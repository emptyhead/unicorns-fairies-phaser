# Node.js Installation via nvm

## Step 1: Install nvm (Node Version Manager)

Run this command in your terminal:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```

Or if you prefer wget:

```bash
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```

## Step 2: Activate nvm

Close and reopen your terminal, or run:

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

## Step 3: Install Node.js

Install the latest LTS version of Node.js:

```bash
nvm install --lts
```

## Step 4: Verify Installation

```bash
node --version
npm --version
```

## Step 5: Run the Development Server

Navigate to your project directory and start Vite:

```bash
cd /home/pes/dev/unicorns-fairies-phaser
npm install
npm run dev
```

The game will be available at http://localhost:5173/

## Managing Node Versions with nvm

- List installed versions: `nvm list`
- Switch to a version: `nvm use <version>`
- Set default version: `nvm alias default <version>`
