# gdt
## Préparationd de l'environnement de dev

- Installer node.js. Téléchargable depuis : https://nodejs.org/en/download/
- Installer git pour la synchronisation avec le repository distant. Téléchargable depuis : https://git-scm.com/download/win
- Choisissez l'éditeur de code de votre choix. Recommendation : https://code.visualstudio.com/download

## Optenir le projet en local
- Ouvrez git bash depuis le répertoire dans lequel vous voulez mettre votre projet
- Initialiser votre compte git. Suivre la procédure suivante: 
```
$ git config --global user.name "John Doe"
$ git config --global user.email johndoe@example.com
```
- Cloner le projet à l'aide de la commande suivante : 
```
git clone https://github.com/Lino004/boa-reservation.git
```
- Se rendre dans le repertoire :
```
cd boa-reservation
```
Continuer avec les section suivante
## Installation des dépendances du projet
```
yarn install
```

### Compilation du projet en mode dev (accessiblevia le http://localhost:8080)
```
yarn run serve
```
