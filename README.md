# MEV GETH Demo

Launches an MEV GETH node, and shows how a miner may profit from it by accepting MEV

## Quickstart

```
git clone https://github.com/flashbots/mev-geth
cd mev-geth && make geth && cd ..
git clone https://github.com/flashbots/mev-geth-demo
cd mev-geth-demo
yarn
GETH=../mev-geth/build/bin/geth ./run.sh
yarn run demo-simple
```
