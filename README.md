<h1 align="center">Projet 3 : Dapp Voting</h1>

<p align="center">
  <img src="voting_dapp_photos/voting%20illustration.webp" alt="Voting Proposals Not Voted Yet">
</p>
<hr>

<h2 align="center">📘 Pour correction :</h2>

<p><strong>Lien vidéo</strong> (durée 3 min 07 sec, vous pouvez la regarder en 1.2x, cela vous fera donc 2 min 35 sec) : <a href="https://www.loom.com/share/0612121444484927a82d6c9ebe39d3eb">https://www.loom.com/share/0612121444484927a82d6c9ebe39d3eb</a></p>

<p><strong>Lien Déploiement</strong> : <a href="https://voting-dapp-ten-blush.vercel.app">https://voting-dapp-ten-blush.vercel.app</a></p>

<p><strong>Déployé sur sépolia</strong> : <code>0x35312cf73B9d7361470eDDBdfd0E2EA887AD932C</code></p>

<p><strong>Groupe constitué de :</strong><br>
- Léo-Paul MARTIN<br>
- Pierre ORGERET</p>

<hr>

<h2 align="center">📁 Détails</h2>

<h3 align="center">📜 Contract</h3>

<p>La faille a été corrigée comme suit : nombre maximum de proposal 5.</p>

<p>Niveaux bonnes pratiques nous avons fait ceci :</p>

<ul>
  <li><strong>Overall</strong>
    <ul>
      <li>Bon partage des taches (contrat + test, frontend voting steps, déploiement)</li>
      <li>Frontend et backend en TypeScript</li>
    </ul>
  </li>
  <li><strong>Backend</strong>
    <ul>
      <li>Backend scripts :
        <ul>
          <li>deployer contrat: <code>yarn run deploy-ll</code> (hardhat) et <code>yarn run deploy-se</code> (sepolia)</li>
          <li>voir la liste des proposals : <code>yarn run proposal-ll</code> (hardhat) et <code>proposal-se</code> (sepolia)</li>
          <li>reset le workflow/clear proposals et voters : <code>reset-ll</code> (hardhat) et <code>reset-se</code> (sepolia)</li>
          <li>update le workflow manually</li>
          <li>automatiser la démo</li>
        </ul>
      </li>
      <li>Backend script dans le <code>package.json</code> pour run les commandes hardhat (compile, test, coverage, node, deploy, proposal, reset)</li>
      <li>Backend test coverage 100% statement, branches, functions, and lines, utilisation de fixture et <code>loadFixture</code> partout</li>
    </ul>
  </li>
  <li><strong>Frontend</strong>
    <ul>
      <li>React context</li>
      <li><a href="https://coolors.co/1f2041-4b3f72-417b5a-d0ceba-e9d2c0">Colors</a></li>
      <li>Message d'alerte quand blockchain down/contract not deployed ou mauvais contrat target</li>
      <li>Variable d'environnement pour update les variables importantes depuis vercel sans update le code
        <ul>
          <li>contract address</li>
          <li>numéro de block de déploiement (début d'écoute des events)</li>
          <li>projectId de walletConnect</li>
          <li>rpc url Sepolia</li>
        </ul>
      </li>
    </ul>
  </li>
</ul>

<hr>

<h3 align="center">🧪 Testing</h3>

<ul>
  <li><strong>Backend</strong>
    <ul>
      <li>Coverage 100% statement, branches, functions, and lines
      <li>Utilisation de fixture et <code>loadFixture</code> partout</li>
    </ul>
  </li>
</ul>

<hr>

<h3 align="center">🎨 Front</h3>

<p>Voici la liste de la stack utilisée pour la réalisation du projet :</p>

<ul>
  <li>Chakra-ui</li>
  <li>Next.JS</li>
  <li>RainbowKit v2</li>
  <li>Viem</li>
  <li>Wagmi</li>
</ul>

<hr>

<h2 align="center">🔄 Flow</h2>

<p align="center">
  <strong>1. Registering Voters</strong><br>
  <img src="voting_dapp_photos/1_registervoter.png" alt="Registering Voters">
</p>

<p align="center">
  <strong>2. Registering Proposals</strong><br>
  <img src="voting_dapp_photos/2_registerproposals.png" alt="Registering Proposals">
</p>

<p align="center">
  <strong>3. Start Voting</strong><br>
  <img src="voting_dapp_photos/3_startvoting.png" alt="Start Voting">
</p>

<p align="center">
  <strong>4. Voting Proposals Not Voted Yet</strong><br>
  <img src="voting_dapp_photos/4_voting_proposals_not_voted_yet.png" alt="Voting Proposals Not Voted Yet">
</p>

<p align="center">
  <strong>5. Voting Search Empty</strong><br>
  <img src="voting_dapp_photos/5_voting_search_empty.png" alt="Voting Search Empty">
</p>

<p align="center">
  <strong>6. Voting Proposals Voted</strong><br>
  <img src="voting_dapp_photos/6_voting_proposals_voted.png" alt="Voting Proposals Voted">
</p>

<p align="center">
  <strong>7. End Voting Proposals</strong><br>
  <img src="voting_dapp_photos/7_endvoting_proposals.png" alt="End Voting Proposals">
</p>

<p align="center">
  <strong>8. End Voting Search</strong><br>
  <img src="voting_dapp_photos/8_endvoting_search%20full.png" alt="End Voting Search">
</p>

<p align="center">
  <strong>9. Votes Tallied</strong><br>
  <img src="voting_dapp_photos/9_vote_tallied.png" alt="Votes Tallied">
</p>

<hr>
