# Projet 3 : Dapp Voting

## Pour correction :

Lien vidéo (durée 3 min 07 sec, vous pouvez la regarder en 1.2x, cela vous fera donc 2 min 35sec :
https://www.loom.com/share/0612121444484927a82d6c9ebe39d3eb

Lien Déploiement: https://voting-dapp-ten-blush.vercel.app

Déployé sur sépolia : 0x35312cf73B9d7361470eDDBdfd0E2EA887AD932C

Groupe constitué de :  
Léo-Paul MARTIN et  
Pierre Orgeret

## Détails

### Contract

La faille a été corrigé comme suit: nombre maximum de proposal 5

Niveaux bonnes pratiques nous avons fait ceci:

- overall
  - bon partage des taches (contrat + test, frontend voting steps, deploiement)
  - frontend et backend en typescript
- backend
  - backend scripts
    - deployer contrat
    - voir la liste des proposals
    - reset le workflow/clear proposals et voters
    - update le workflow manually
    - automatiser la demo
  - backend script dans le package.json pour run les commandes hardhat (compile, test, coverage, node, deploy, proposal, reset)
  - backend test coverage 100% statement, branches, functions and lines, utilisation de fixture et loadFixture partout
- frontend
  - react context
  - [colors](https://coolors.co/1f2041-4b3f72-417b5a-d0ceba-e9d2c0)
  - message d'alerte quand blockchain down/contract not deployed ou mauvais contrat target
  - variable d'environnement pour update les variables importante depuis vercel sans update le code
    - contract address
    - numero de block de deploiement (debut d'ecoute des events)
    - projectId de walletConnect
    - rpc url Sepolia

### Testing

- backend
  - coverage 100% statement, branches, functions and lines
  - utilisation de fixture et loadFixture partout

### Front

Voici la liste de la stack utilisée pour la réalisation du projet

- Chakra-ui
- Next.JS
- RainbowKit v2
- Viem
- Wagmi
