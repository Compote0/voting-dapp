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

- react context
- backend script pour deployer, voir la liste des proposals, reset le workflow/clear proposals, update le workflow manually
- backend script dans le package.json pour run les commandes hardhat (compile, test, coverage, node, deploy, proposal, reset)

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
  - ne pas avoir d'erreur quand wallet connecté mais blockchain down
  - mauvaise address de contrat target
- writecontract
  - votingSession
- readcontrat
  - winningproposal (3)
- events (independent)
  - ProposalRegistered
  - Voted
- testing
  - add fixture & beforeEach
  - reset function test
- setup sepolia chain (4)
- deploy on vercel (5)
