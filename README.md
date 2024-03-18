# Projet 3 : Dapp Voting

## Pour correction :

// Lien vidéo: LINK  
// Lien Déploiement: LINK  
// Déployé sur sépolia

Groupe constitué de :  
Léo-Paul MARTIN et  
Pierre Orgeret

## Détails

### Contract

La faille a été corrigé comme suit: nombre maximum de proposal 5

Niveaux bonnes pratiques nous avons fait ceci:

- overall
  - bon partage des taches (contrat test, frontend voting step)
  - frontend et backend en typescript
- backend
  - backend scripts
    - deployer contrat
    - voir la liste des proposals
    - reset le workflow/clear proposals et voters
    - update le workflow manually
    - automatiser la demo
  - backend script dans le package.json pour run les commandes hardhat (compile, test, coverage, node, deploy, proposal, reset)
  - backend test coverage 100% statement, branches, functions and lines
- frontend
  - react context
  - message d'alerte quand blockchain down/contract not deployed
  - variable d'environnement pour update les variables importante depuis vercel sans update le code
    - contract address
    - numero de block de deploiement (debut d'ecoute des events)
    - projectId de walletConnect

### Testing

Rien a faire ici

### Front

Voici la liste de la stack utilisée pour la réalisation du projet

- chakra-ui
- nextjs
- rainbowki
- viem
- wagmi

## todo

- style
  - gifs description
  - 1/2 : ne pas avoir d'erreur quand wallet connecté mais blockchain down
- setup sepolia chain (4)
- deploy on vercel (5)
